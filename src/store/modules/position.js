import { SET_GEOLOCATION, SET_ADDRESS } from '../mutationTypes'
import { geoLocation, getAddress } from '@/utils/map'
import cities from '@/config/city.json'

const state = {
  lng: 116.397428, // 经度
  lat: 39.90923, // 纬度
  city: '北京市', // 城市名称
  address: '北京市东城区东华门街道天安门', // 地址
  hasGeoLocation: false // 是否已经定位
}

const getters = {
  location: state => {
    return [state.lng, state.lat]
  },
  cityText: state => {
    const index = state.city.indexOf('市')
    if (index > -1) {
      return state.city.slice(0, index)
    } else {
      return state.city.slice(0, 2)
    }
  },
  cityCode: state => {
    let code = ''
    cities.forEach(item => {
      if (item.name === state.city) {
        code = item.code
      }
    })
    return code
  }
}

const mutations = {
  [SET_GEOLOCATION]: (state, position) => {
    state.lng = position.lng
    state.lat = position.lat
    state.hasGeoLocation = true
  },
  [SET_ADDRESS]: (state, data) => {
    state.city = data.city
    state.address = data.address
  },
}

const actions = {
  // 进行定位
  async updateGeoLocation({ dispatch, commit, state }) {
    if (!state.hasGeoLocation) {
      try {
        const result = await geoLocation()
        commit(SET_GEOLOCATION, result)
        dispatch('updateAddress')
      } catch (err) {
        console.error(err.message)
      }
    }
  },
  // 获取定位地址和城市
  async updateAddress({ commit, state }) {
    try {
      const result = await getAddress(state.lng, state.lat)
      commit(SET_ADDRESS, result)
    } catch (err) {
      console.error(err.message)
    }
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
