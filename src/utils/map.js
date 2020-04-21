/**
 * 浏览器定位
 */
export function geoLocation() {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geolocation', () => {
      const geolocation = new window.AMap.Geolocation()
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
export function getAddress(lng, lat) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new window.AMap.Geocoder({
        city: '010',
      })
      const location = [lng, lat]
      geocoder.getAddress(location, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
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
export function getLocation(address) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.Geocoder', () => {
      const geocoder = new window.AMap.Geocoder({
        // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
        city: '010'
      })
    
      geocoder.getLocation(address, (status, result) => {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
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
    window.AMap.plugin('AMap.DistrictSearch',  () => {
      const districtSearch = new window.AMap.DistrictSearch(options)
      districtSearch.search(keywords, (status, result) => {
        // 查询成功时，result即为对应的行政区信息
        if (status === 'complete' && result.info === 'OK') {
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
 * 获取POI搜索P数据
 * @param {any} options 配置参数
 * @param {string} keywords 查询关键字
 */
export function placeSearch(options, keywords) {
  return new Promise((resolve, reject) => {
    window.AMap.plugin('AMap.PlaceSearch', function(){
      const placeSearch = new window.AMap.PlaceSearch(options);
      placeSearch.search(keywords, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          resolve(result.poiList)
        } else {
          reject(result)
        }
      })
    })
  })
}