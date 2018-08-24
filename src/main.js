import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'
import Store from './store/store.js'

new Vue({
  el: '#app',
  store: Store,
  render: h => h(App)
})

Vue.use(Notifications)