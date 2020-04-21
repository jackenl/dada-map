import Vue from 'vue'
import Vuex from 'vuex'

import position from './modules/position'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    position
  }
})

export default store