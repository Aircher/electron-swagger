import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: Home
    },
    {
      path: '/list',
      name: 'list-page',
      component: () => import('./views/List.vue')
    }
  ]
})
