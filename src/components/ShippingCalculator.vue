<template>
  <div id="shipping-calculator">

    <Loading 
      v-if="loading > 0">
    </Loading>

    <ShipForm 
      v-else-if="!submitted" class="ship-form"
      v-on:updateFormValues="updateFormValues"
      v-on:submitShippingInfo="submitShippingInfo"
      v-bind="{allCountries, error, errorMessage}">
    </ShipForm>

    <Results
      v-else class="results"
      v-on:toggleSubmitted="toggleSubmitted"
      v-on:resetForm="resetForm"
      v-bind="{results, country, weight, length, width, height}">
    </Results>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import Loading from './Loading'
import ShipForm from './ShipForm'
import Results from './Results'

const CountryQuery = gql`
query Country {
    allCountries (orderBy: countryName_ASC){
      id
      countryName
      countryCode
    }
}`

const CountryShipRates = gql`
query Country ($id: ID, $LWH: Int, $length: Int, $weight: Int) {
    Country(id: $id) {
      shipRates (
        filter: {
          maxLWH_gte: $LWH,
          maxLength_gte: $length,
          maxWeight_gte: $weight,
          minWeight_lte: $weight
        },
        orderBy: regionCode_ASC
      ){
        maxLWH
        maxLength
        maxWeight
        method
        minWeight
        rate
        regionCode
    }
  }
}`

export default {
  name: 'ShippingCalculator',
  components: {
    ShipForm,
    Results,
    Loading
  },

  data: () => ({
    submitted: false,
    country: null,
    weight: null,
    length: null,
    width: null,
    height: null,
    loading: 0,
    results: null,
    error: false,
    errorMessage: ''
  }),

  apollo: {
    $loadingKey: 'loading',
    allCountries: CountryQuery
  },

  computed: {
    LWH(){
      return Number(this.length) * Number(this.width) * Number(this.height)
    }
  },

  methods: {
    submitShippingInfo(){
      if (this.country === null || this.weight === null || this.length === null || this.width === null || this.height === null) {
        this.error = true
        this.errorMessage = "*Please complete entire form"
        this.loading = 0
      }

      else {
        this.loading = 1
        const id = this.country.id
        const LWH = this.LWH
        const length = Number(this.length)
        const weight = Number(this.weight)

        this.$apollo.query({
          query: CountryShipRates,
          variables: {
            id,
            LWH,
            length,
            weight
          }
        }).then(response => {
          this.results = response.data.Country.shipRates
          this.toggleSubmitted()
          this.loading = 0
        }).catch((error) => {
          console.error(error)
          this.loading = 0
        })
      }
    },

    toggleSubmitted(){
      this.submitted = !this.submitted
    },

    updateFormValues(country, weight, length, width, height) {
      this.country = country
      this.weight = weight
      this.length = length
      this.width = width
      this.height = height
    },

    resetForm() {
      this.country = null,
      this.submitted = false,
      this.country = null,
      this.weight = null,
      this.length = null,
      this.width = null,
      this.height = null,
      this.loading = 0,
      this.results = null,
      this.error = false,
      this.errorMessage = ''
    }
  },
}
</script>
