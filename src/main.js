import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// global css
import './assets/styles/index.scss'
import request from '@/utils/request'
import '@/assets/icons/index'
import permission from "@/components/Permission";

Vue.config.productionTip = false
Vue.use(permission)
Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
