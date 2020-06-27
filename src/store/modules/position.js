import { SET_GEOLOCATION, SET_ADDRESS } from '../mutationTypes'
import { convertFrom, getAddress } from '@/utils/map'
import cities from '@/config/city.json'
import { insertCity } from '@/api/travel'

const state = {
  location: {
    lng: 114.057868,
    lat: 22.543099,
  }, // 位置信息
  city: '深圳市', // 城市名称
  address: '', // 地址
  hasGeoLocation: false, // 是否已经定位
}

const getters = {
  lnglat: (state) => {
    return [state.location.lng, state.location.lat]
  },
  cityText: (state) => {
    const index = state.city.indexOf('市')
    if (index > -1) {
      return state.city.slice(0, index)
    } else {
      return state.city.slice(0, 2)
    }
  },
  cityCode: (state) => {
    let code = ''
    cities.forEach((item) => {
      if (item.name === state.city) {
        code = item.code
      }
    })
    return code
  },
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
  updateGeoLocation({ dispatch, commit, state }) {
    if (!state.hasGeoLocation) {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const gps = [position.coords.longitude, position.coords.latitude]
          const result = await convertFrom(gps, 'gps')
          commit(SET_GEOLOCATION, result)
          dispatch('updateAddress')
        })
      } catch (err) {
        console.log('定位失败：', err)
      }
    }
  },
  // 获取定位地址和城市
  async updateAddress({ commit, getters }) {
    try {
      const result = await getAddress(getters.lnglat)
      await insertCity({ city: result.city }) // 记录城市
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
  actions,
}
