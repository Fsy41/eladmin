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
import 'default-passive-events' //解决新版的Chrome浏览器警告

Vue.config.productionTip = false
Vue.use(permission)
Vue.prototype.$request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
