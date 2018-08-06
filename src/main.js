import Vue from 'vue'
import App from './App.vue'
import Notifications from 'vue-notification'

new Vue({
  el: '#app',
  render: h => h(App)
})

Vue.use(Notifications)