/**
 * 浏览器定位
 */
export function geoLocation(options) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new window.AMap.Geolocation(options)
      geolocation.getCurrentPosition((status, result) => {
        if (status === 'complete') {
          resolve(result.position)
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 地理编码坐标转地址
 * @param {number} lng 经度
 * @param {number} lat 纬度
 */
export function getAddress(lnglat) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new window.AMap.Geocoder({
        city: '010',
      })
      geocoder.getAddress(lnglat, (status, result) => {
        if (status === 'complete') {
          // result为对应的地理位置详细信息
          let city = ''
          if (result.regeocode.addressComponent.city) {
            city = result.regeocode.addressComponent.city
          } else {
            city = result.regeocode.addressComponent.province
          }
          const address = result.regeocode.formattedAddress
          resolve({ city, address })
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 地理编码地址转坐标
 * @param {string} address
 */
export function getLocation(keywords) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new window.AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '010',
      })

      geocoder.getLocation(keywords, (status, result) => {
        if (status === 'complete') {
          const lnglat = result.geocodes[0].location
          resolve(lnglat)
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 行政区域信息查询
 * @param {any} options 配置信息
 * @param {string} keywords 查询关键字
 */
export function districtSearch(options, keywords) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.DistrictSearch', () => {
      const districtSearch = new window.AMap.DistrictSearch(options)
      districtSearch.search(keywords, (status, result) => {
        if (status === 'complete') {
          const district = result.districtList[0]
          resolve(district)
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 获取搜索提示数据
 * @param {any} options 配置参数
 * @param {string} keywords 查询关键字
 */
export function autoComplete(options, keywords) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.AutoComplete', () => {
      const autoComplete = new window.AMap.Autocomplete(options)
      autoComplete.search(keywords, (status, result) => {
        if (status === 'complete') {
          resolve(result.tips)
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 获取POI搜索P数据
 * @param {any} options 配置参数
 * @param {string} keywords 查询关键字
 */
export function placeSearch(options, keywords) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.PlaceSearch', () => {
      const placeSearch = new window.AMap.PlaceSearch(options)
      placeSearch.search(keywords, (status, result) => {
        if (status === 'complete') {
          resolve(result.poiList.pois)
        } else {
          reject(result)
        }
      })
    })
  })
}

/**
 * 路线规划
 * @param {*} plugin 
 * @param {*} options 
 * @param {*} origin 
 * @param {*} destination 
 */
export function requestRoute(plugin ,options, origin, destination) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin(plugin, () => {
      let route = null
      switch (plugin) {
        case 'AMap.Transfer':
          route = new window.AMap.Transfer(options);
          break;
        case 'AMap.Driving':
          route = new window.AMap.Driving(options);
          break;
        case 'AMap.Riding':
          route = new window.AMap.Riding(options);
          break;
        case 'AMap.Walking':
          route = new window.AMap.Walking(options);
          break;
        default: //默认公交路线规划
          route = new window.AMap.Transfer(options);
          break;
      }
      if (!origin || !destination) {
        reject('MISSING_REQUIRED_PARAMS')
      }
      route.search(origin, destination, (status, result) => {
        if (status === 'complete') {
          const routes = plugin === 'AMap.Transfer' ? result.plans : result.routes
          resolve({
            plugin: route,
            routes: routes
          })
        } else {
          reject(result)
        }
      })
    })
  })
}

export function convertFrom(lnglat, type) {
  return new Promise((resolve, reject) => {
    window.AMap.convertFrom(lnglat, type, (status, result) => {
      if (result.info === 'ok') {
        const location = result.locations[0]; // Array.<LngLat>
        resolve(location)
      } else {
        reject(result)
      }
    });
  })
}