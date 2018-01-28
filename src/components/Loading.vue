<template>
  <v-layout class="loading" row wrap>
    <v-flex xs4 offset-xs4>
      <img src="../assets/loading.gif">
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'Loading'
}

</script>

<style scoped>

.loading {
  margin-top: 50px;
}

img {
  height: 100px;
  display: block;
  margin: 0 auto;
}

</style>
