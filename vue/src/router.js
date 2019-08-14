import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
    },
    {
      path: '/add',
      name: 'home-page',
      component: Home
    },
    {
      path: '/list',
      name: 'list-page',
      component: () => import('./views/List.vue')
    },
    {
      path: '/swaggerconfig',
      name: 'swaggerconfig-page',
      component: () => import('./views/SwaggerConfig.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/list') {
    if (store.state.app.swaggerConfig.length === 0) {
      next('/add')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
