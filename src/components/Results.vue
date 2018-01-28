<template>
  <div id="results">
    <v-container>

      <v-layout row wrap>
        <v-flex xs12>
          <v-btn
            v-on:click="handleToggleResults"
            color="success">
            <v-icon>arrow_back</v-icon>
            Back
          </v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            :items="searchCriteria"
            hide-actions
            hide-headers
            >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.left }}</td>
              <td>{{ props.item.right }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <h2>Shipping Rates</h2>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="results"
            hide-actions
            >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.rate | yenToUSD }}</td>
              <td class="text-xs-right">{{ props.item.method }}</td>
              <td class="text-xs-right">{{ props.item.regionCode }}</td>
              <td class="text-xs-right">{{ props.item.maxLength }}</td>
              <td class="text-xs-right">{{ props.item.maxLWH }}</td>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: 'Results',
  props: ['results', 'country', 'weight', 'length', 'width', 'height'],
  data: () => ({
    headers: [
      {
        text: 'Rate USD',
        align: 'left',
        sortable: true,
        value: 'name'
      },
      { text: 'Shipping Method', value: 'method' },
      { text: 'Region', value: 'regionCode' },
      { text: 'Max Length (cm)', value: 'maxLength' },
      { text: 'Max LWH (cm)', value: 'maxLWH' }
    ],
  }),

  methods: {
    handleToggleResults(){
      this.$emit('toggleSubmitted')
      this.$emit('resetForm')
    }
  },

  filters: {
    yenToUSD(val) {
      //find conversion api
      return (val*0.0092).toFixed(2) || val
    }
  },

  computed: {
    searchCriteria(){
      const row1 = { left: 'Ship-to', right: this.country.countryName }
      const row2 = { left: 'Weight', right: this.weight + ' grams' }
      const row3 = { left: 'LxWxH', right: this.length + 'x' + this.width + 'x' + this.height + 'cm' }
      const table = [row1, row2, row3]

      return table
    }
  }
}

</script>

<style scoped>

i {
  margin-right: 16px;
}

button {
  margin-top: 15px;
  margin-bottom: 15px;
  margin-left: 0px;
}

h2 {
  margin-top: 50px;
  margin-bottom: 15px;
  font-weight: 400;
}

</style>
