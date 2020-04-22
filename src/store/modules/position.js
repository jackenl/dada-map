import { SET_GEOLOCATION, SET_ADDRESS } from '../mutationTypes'
import { geoLocation, getAddress } from '@/utils/map'
import cities from '@/config/city.json'

const state = {
  location: null, // 位置信息
  city: '北京市', // 城市名称
  address: '', // 地址
  hasGeoLocation: false // 是否已经定位
}

const getters = {
  lnglat: state => {
    return [state.location.lng, state.location.lat]
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
  [SET_GEOLOCATION]: (state, location) => {
    state.location = location
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
        console.log('定位失败：', err)
      }
    }
  },
  // 获取定位地址和城市
  async updateAddress({ commit, getters }) {
    try {
      const result = await getAddress(getters.lnglat)
      commit(SET_ADDRESS, result)
    } catch (err) {
      console.log('地理编码转换失败：', err)
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
