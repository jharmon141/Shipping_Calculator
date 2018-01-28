<template>
  <v-app>
    <ShippingCalculator/>
  </v-app>
</template>

<script>
import ShippingCalculator from './components/ShippingCalculator'

export default {
  name: 'App',
  components: {
    ShippingCalculator
  },

  data: () => ({
    title: 'Shipping Calculator'
  }),

}
</script>

<style>
</style>
