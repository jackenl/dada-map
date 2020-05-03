import { login, getUserInfo } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import {  RESET_USER_STATE, SET_USER_INFO } from '../mutationTypes'

const getDefaultState = () => {
  return {
    userInfo: '',
  }
}

const state = getDefaultState()

const mutations = {
  [RESET_USER_STATE]: (state) => {
    Object.assign(state, getDefaultState())
  },
  [SET_USER_INFO]: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then((res) => {
        setToken(res.token)
        dispatch('getInfo')
        resolve()
      }).catch(err => {
        reject(err)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo().then(res => {
        if (!res) {
          reject('获取用户信息失败，请重新登陆')
        }
        
        commit(SET_USER_INFO, res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      removeToken()
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
