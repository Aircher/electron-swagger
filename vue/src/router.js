import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'
import { Notice } from 'iview'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/list'
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
      Notice.info({
        title: '温馨提示',
        desc: '您还未添加任何swagger配置,请添加swagger配置。',
        duration: 2
      })
      next('/swaggerconfig')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
