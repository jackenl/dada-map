import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import './assets/style/reset.css' // reset system css
import 'vant/lib/index.css'
import './assets/style/iconfont.less' // iconfont

import '@/icons' // icon

import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
