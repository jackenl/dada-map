<template>
  <div class="user-map">
    <Map ref="map" :options="mapOptions" height="105%" geolocation="none" />
    <van-popup class="desc-popup" :value="visible" position="bottom" :overlay="false">
      <div class="content">
        {{cities.length}}个点亮城市
        <p>再接再厉哦</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant'
import Map from '@/components/Map'
import { districtSearch } from '@/utils/map'
import { getTravelData } from '@/api/travel'

export default {
  name: 'user-map',
  components: {
    'van-popup': Popup,
    Map,
  },
  data() {
    return {
      mapOptions: {
        resizeEnable: true,
        zoom: 2, //地图显示的缩放级别
        mapStyle: 'amap://styles/grey', // 地图样式
      },
      cities: [], // 点亮城市列表
      overtake: '27%',
      polygons: [],
      visible: false
    }
  },
  async mounted() {
    this.visible = true
    await this.getCities()
    await this.drawBounds()
  },
  methods: {
    async getCities() {
      const result = await getTravelData()
      this.cities = result.cities
    },
    async drawBounds() {
      const opts = {
        subdistrict: 0, //获取边界不需要返回下级行政区
        extensions: 'all', //返回行政区边界坐标组等具体信息
        level: 'district', //查询行政级别为 市
      }
      try {
        for (let i = 0; i < this.cities.length; i++) {
          const result = await districtSearch(opts, this.cities[i])
          if (result.boundaries) {
            result.boundaries.forEach((bound) => {
              const polygon = new window.AMap.Polygon({
                strokeWeight: 1,
                path: bound,
                fillOpacity: 0.4,
                fillColor: '#80d8ff',
                strokeColor: '#0091ea',
              })
              this.polygons.push(polygon)
            })
          }
        }
        const map = this.$refs.map.map
        map.add(this.polygons)
        map.setFitView(this.polygons) //视口自适应
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.user-map {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .desc-popup {
    height: 20%;
    background-color: transparent;
    margin-bottom: 20px;
    .content {
      height: 100%;
      margin: 0 30px;
      background-color: #1f1b26;
      color: #fff;
      border-radius: 10px;
      padding: 20px 20px 0;
    }
  }
}
</style>
