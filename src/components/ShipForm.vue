<template>
  <div id="ship-form">
    <v-container>

      <v-form>
        <v-layout row wrap>
          <v-flex xs12>
            <v-select
              :items="allCountries"
              item-text="countryName"
              v-model="country"
              label="Country"
              v-on:input="handleUpdateValue"
              >
              <template slot="selection" slot-scope="data">
                <v-list-title-content>
                  <flag :iso="data.item.countryCode.toLowerCase()" />
                  {{ data.item.countryName }}
                </v-list-title-content>
              </template>
              <template slot="item" slot-scope="data">
                <v-list-title-content>
                  <flag :iso="data.item.countryCode.toLowerCase()" />
                  {{ data.item.countryName }}
                </v-list-title-content>
              </template>
            </v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field
              :value="weight"
              v-model="weight"
              type="number"
              label="Weight"
              v-on:input="handleUpdateValue"
              suffix="gm"
              :rules="[() => weight > 0 || 'Weight must be greater than 0']"
              ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row justify-space-between>
          <v-flex xs3>
            <v-text-field
              :value="length"
              v-model="length"
              type="number"
              label="Length"
              suffix="cm"
              v-on:input="handleUpdateValue"
              :rules="[() => length > 0 || 'Length must be greater than 0']"
              ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              :value="width"
              v-model="width"
              type="number"
              label="Width"
              suffix="cm"
              v-on:input="handleUpdateValue"
              :rules="[() => width > 0 || 'Width must be greater than 0']"
              ></v-text-field>
          </v-flex>

          <v-flex xs3>
            <v-text-field
              :value="height"
              v-model="height"
              type="number"
              label="Height"
              suffix="cm"
              v-on:input="handleUpdateValue"
              :rules="[() => height > 0 || 'Height must be greater than 0']"
              ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <v-btn
              v-on:click="handleSubmitForm"
              color="success">
              <v-icon>fa-bolt</v-icon>
              Get Rates 
            </v-btn>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12>
            <transition name="fade">
              <p v-if="error" id="error">{{ errorMessage }}</p>
            </transition>
          </v-flex>
        </v-layout>

      </v-form>

    </v-container>
  </div>
</template>

<script>

export default {
  name: 'ShipForm',
  props: ['allCountries', 'error', 'errorMessage'],

  data: () => ({
    country: null,
    weight: null,
    length: null,
    width: null,
    height: null 
  }),

  methods: {
    handleUpdateValue() {
      this.$emit('updateFormValues', this.country, this.weight, this.length, this.width, this.height)
    },

    handleSubmitForm(){
      this.$emit('submitShippingInfo')
    },
  },

}
</script>

<style scoped>

i.fa {
  margin-right: 16px;
}

button {
  margin-top: 15px;
  margin-left: 0px;
}

#error {
  color: red;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
