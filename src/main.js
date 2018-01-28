// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import FlagIcon from 'vue-flag-icon'

Vue.use(FlagIcon)
Vue.use(Vuetify)

Vue.config.productionTip = false

const httpLink = new HttpLink({
   uri: 'https://api.graph.cool/simple/v1/cjcy65rb40k4j0150tisaa31q'
});

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

Vue.use(VueApollo)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  components: { App },
  template: '<App/>'
})
