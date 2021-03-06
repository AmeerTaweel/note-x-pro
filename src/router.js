import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: `/`,
      name: 'home',
      component: Home
    }, {
      path: `/viewnote/:index`,
      name: `viewnote`,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "viewnote" */ `./views/ViewNote.vue`)
    }, {
      path: `/createnote`,
      name: `createnote`,
      component: () => import(/* webpackChunkName: "createnote" */ `./views/CreateNote.vue`)
    }, {
      path: `/editnote/:index`,
      name: `editnote`,
      component: () => import(/* webpackChunkName: "editnote" */ `./views/EditNote.vue`)
    }
  ]
})
