<template>
  <div class="travel-detail">
    <Map ref="map" geolocation="none" height="105%" />
    <div class="footer">
      <div class="label">{{ record.create_time | formatDate }}</div>
      <div class="content">
        <div class="content-cell">
          <div class="cell-main">{{ record.tool }}</div>
          <div class="cell-label">出行方式</div>
        </div>
        <div class="content-cell">
          <div class="cell-main">{{ record.distance | formatDistance }}公里</div>
          <div class="cell-label">距离</div>
        </div>
        <div class="content-cell">
          <div class="cell-main">{{ record.time | formatTime }}</div>
          <div class="cell-label">所用时间</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map'
import { getTravelReCordById } from '@/api/travel'
import { requestRoute, getAddress } from '@/utils/map'
import trafficTools from '@/config/trafficTools'
import { formatDistance, formatTime } from '@/utils/format'
import { parseTime } from '@/utils/index'

export default {
  name: 'travel-detail',
  components: {
    Map,
  },
  filters: {
    formatDistance,
    formatTime,
    formatDate(value) {
      return parseTime(value, '{y}年{m}月{d}日 {h}:{i}')
    },
  },
  data() {
    return {
      record: {},
      recordId: '',
      map: null,
    }
  },
  mounted() {
    this.recordId = this.$route.query.id
    this.getTravelRecord()
  },
  methods: {
    async getTravelRecord() {
      if (this.recordId) {
        const result = await getTravelReCordById({
          id: this.recordId,
        })
        trafficTools.forEach((tool) => {
          if (tool.value === result.type) {
            result.tool = tool.label
          }
        })
        this.record = result
        this.getRoute()
      }
    },
    async getRoute() {
      try {
        const map = this.$refs.map.map
        const location = await getAddress(this.record.start)
        const opts = {
          map: map,
          city: location.city,
          autoFitView: true,
        }
        let plugin = ''
        switch (this.record.type) {
          case 'driving':
            plugin = 'AMap.Driving'
            break
          case 'riding':
            plugin = 'AMap.Riding'
            break
          case 'walking':
            plugin = 'AMap.Walking'
            break
          default:
            plugin = 'AMap.Transfer'
            break
        }
        const origin = new window.AMap.LngLat(this.record.start[0], this.record.start[1])
        const distination = new window.AMap.LngLat(this.record.end[0], this.record.end[1])
        const result = await requestRoute(plugin, opts, origin, distination)
      } catch (err) {
        this.$toast('获取路线轨迹失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.travel-detail {
  position: relative;
  height: 100%;
  overflow: hidden;
  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 250px;
    background-color: #1a1a1a;
    color: #fff;
    .label {
      padding: 20px;
      font-size: 14px;
    }
    .content {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
      &-cell {
        text-align: center;
        .cell-label {
          margin-top: 10px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
