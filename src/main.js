import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from './store/store.js'
import Notifications from 'vue-notification'
import App from './App.vue'
import Editor from './components/Editor.vue'

const router = new VueRouter({
  routes: [
    {path: '', Editor}
    ]
})

new Vue({
  el: '#app',
  store: Store,
  router: router,
  render: h => h(App)
})

Vue.use(Notifications)