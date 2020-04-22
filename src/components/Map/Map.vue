<template>
  <!-- 地图组件 -->
  <div class="map">
    <div id="container" :style="containerStyle"></div>
    <div v-if="traffic" class="toggle traffic-toggle" @click="trafficToggle">
      <van-icon class-prefix="my-icon" :name="trafficVisible ? 'traffic-on' : 'traffic-off'" size="18"></van-icon>
      <span>路况</span>
    </div>
    <div v-if="satellite" class="toggle satellite-toggle" @click="satelliteToggle">
      <van-icon class-prefix="my-icon" :name="satelliteVisible ? 'map' : 'satellite'" size="18"></van-icon>
      <span>{{ satelliteVisible ? '标准图' : '卫星图' }}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import { geoLocation } from '@/utils/map';

export default {
  name: 'name',
  components: {
    'van-icon': Icon,
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 高德地图地图实例配置参数
    options: {
      default: () => {
        return {
          resizeEnable: true,
          center: [116.397428, 39.90923],
          zoom: 13,
        }
      },
    },
    // 地图控件
    plugins: {
      type: Array,
      default: () => [],
    },
    // 实时定位
    geolocation: {
      type: Boolean,
      default: () => true
    },
    // 实时路况图层
    traffic: {
      type: Boolean,
      default: () => false,
    },
    // 卫星图层
    satellite: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      map: null, // 地图实例
      trafficLayer: null, // 实时路况图层
      trafficVisible: false, // 是否显示实时路况
      satelliteLayer: null, // 卫星图层
      satelliteVisible: false, // 是否显示卫星图层
      marker: null, // 位置标注
      location: null // 定位信息
    }
  },
  computed: {
    containerStyle() {
      const style = {}
      if (this.width.indexOf('px') > -1 || this.width.indexOf('%')) {
        style.width = this.width
      } else {
        const width = Number(this.width)
        if (!isNaN(width)) {
          style.width = width + 'px'
        } else {
          style.width = '100%'
        }
      }
      if (this.height.indexOf('px') > -1 || this.height.indexOf('%')) {
        style.height = this.height
      } else {
        const height = Number(this.height)
        if (!isNaN(height)) {
          style.height = height + 'px'
        } else {
          style.height = '100%'
        }
      }
      return style
    }
  },
  mounted() {
    this.createMap()
    if (this.traffic) {
      // 添加实时路况图层
      this.trafficLayer = new window.AMap.TileLayer.Traffic()
    }
    if (this.satellite) {
      // 添加卫星图层
      this.satelliteLayer = new window.AMap.TileLayer.Satellite()
    }
    if (this.geolocation) {
      // 设置实时定位
      this.setGeolocation()
    }
  },
  methods: {
    createMap() {
      this.map = new window.AMap.Map('container', this.options)
      this.addControl()
    },
    // 添加地图控件
    addControl() {
      window.AMap.plugin(this.plugins, () => {
        if (this.plugins.indexOf('AMap.ToolBar') > -1) {
          this.map.addControl(
            new window.AMap.ToolBar({
              position: {
                bottom: '60px',
                right: '15px',
              },
            })
          )
        }
        if (this.plugins.indexOf('AMap.Scale') > -1) {
          this.map.addControl(new window.AMap.Scale())
        }
      })
    },
    // 地图定位
    async setGeolocation() {
      window.AMap.plugin('AMap.Geolocation', () => {
        const geolocation = new window.AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          position: 'RB', //定位按钮的停靠位置
          offset: [20, 70], // 定位偏移量
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        })
        // 添加定位插件
        this.map.addControl(geolocation)
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            this.location = result.position
          } else {
            console.log('定位失败：', result)
          }
        })
      })
    },
    // 实时路况按钮
    trafficToggle() {
      if (this.trafficVisible) {
        this.map.remove(this.trafficLayer)
        this.trafficVisible = false
      } else {
        this.map.add(this.trafficLayer)
        this.trafficVisible = true
      }
    },
    // 卫星图层按钮
    satelliteToggle() {
      if (this.satelliteVisible) {
        this.map.remove(this.satelliteLayer)
        this.satelliteVisible = false
      } else {
        this.map.add(this.satelliteLayer)
        this.satelliteVisible = true
      }
    },
    // 添加标记定位
    setMarker(location) {
      if (this.marker) {
        this.map.remove(this.marker) // 删除原标记
      }
      const { lng, lat } = location
      this.marker = new window.AMap.Marker({
        position: new window.AMap.LngLat(lng, lat),   // 经纬度对象
      })
      this.map.add(this.marker) // 添加标记
      this.map.setCenter([lng, lat]) // 修改地图中心
    },
  },
}
</script>

<style lang="less" scoped>
.map {
  position: relative;
  width: 100%;
  height: 100%;
  .toggle {
    width: 72px;
    height: 72px;
    overflow: hidden;
    border-radius: 10px;
    background-color: rgba(0,0,0,.4);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    &.satellite-toggle {
      position: absolute;
      top: 250px;
      right: 30px;
    }
    &.traffic-toggle {
      position: absolute;
      top: 150px;
      right: 30px;
    }
  }
}
</style>
