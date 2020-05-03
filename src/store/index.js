import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import position from './modules/position'

Vue.use(Vuex)

const getters = {
  hasGetUserInfo: state => !!state.user.userInfo
}

const store = new Vuex.Store({
  modules: {
    position,
    user
  },
  getters,
})

export default store