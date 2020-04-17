import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import './assets/style/reset.css' // reset system css
import './assets/style/var.less' // theme for css
import 'vant/lib/index.css'

import { Toast } from 'vant'
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
