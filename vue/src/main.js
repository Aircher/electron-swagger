import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import iview from 'iview'
import 'iview/dist/styles/iview.css'
import Directives from '@/directives'
Vue.use(iview)
Vue.use(Directives)

Vue.config.productionTip = false

const $vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.$vm = $vm
