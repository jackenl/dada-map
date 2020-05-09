<template>
  <div class="sport-detail">
    <Map ref="map" geolocation="none" height="105%" />
    <div class="footer">
      <div class="label">
        <div class="title">{{ record.create_time | formatDate }}</div>
        <div class="main">
          <span>{{ record.distance | formatDistance }}</span>
          公里
        </div>
      </div>
      <div class="content">
        <div class="content-cell">
          <div class="cell-main">{{ record.sport }}</div>
          <div class="cell-label">运动方式</div>
        </div>
        <div class="content-cell">
          <div class="cell-main">{{ record.speed | formatSpeed }}</div>
          <div class="cell-label">平均速度</div>
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
import { mapState } from 'vuex'
import { getSportRecordById } from '@/api/sport'
import { requestRoute, getAddress } from '@/utils/map'
import sportTypes from '@/config/sportTypes'
import { formatDistance, formatTime, formatSpeed } from '@/utils/format'
import { parseTime } from '@/utils/index'

export default {
  name: 'sport-detail',
  components: {
    Map,
  },
  filters: {
    formatDistance,
    formatTime,
    formatSpeed,
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
  computed: {
    ...mapState('user', ['userInfo']),
  },
  mounted() {
    this.recordId = this.$route.query.id
    this.map = this.$refs.map
    this.getSportRecord()
  },
  methods: {
    async getSportRecord() {
      if (this.recordId) {
        const result = await getSportRecordById({
          id: this.recordId,
        })
        sportTypes.forEach(item => {
          if (item.value === result.type) {
            result.sport = item.label
          }
        })
        this.record = result
        this.setSportPolyline()
      }
    },
    setSportPolyline() {
      const startMarker = new window.AMap.Marker({
        position: this.record.path[0],
      })
      const endMarker = new window.AMap.Marker({
        position: this.record.path[this.record.path.length - 1],
      })
      this.map.map.add([startMarker, endMarker])
      this.map.setPolyline(this.record.path) // 描绘运动轨迹
    }
  }
}
</script>

<style lang="less" scoped>
.sport-detail {
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
      display: flex;
      justify-content: space-between;
      .main {
        & > span {
          display: inline-block;
          font-size: 30px;
          line-height: 1;
        }
      }
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
