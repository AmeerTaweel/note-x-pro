import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from './store/store.js'
import Notifications from 'vue-notification'
import App from './App.vue'
import SavedNotes from './components/SavedNotes.vue'
import CreateNote from './components/CreateNote.vue'
import ViewAndEditNote from './components/View&EditNote.vue'

Vue.use(Notifications)
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/saved', component: SavedNotes},
    {path: '/create', component: CreateNote},
    {path: '/edit/:index', component: ViewAndEditNote}
  ]
})

new Vue({
  el: '#app',
  store: Store,
  router,
  render: h => h(App)
})
