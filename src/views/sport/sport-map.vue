<template>
  <div class="sport-map">
    <Map ref="map" height="103%" />
    <van-popup class="over-lay" :class="{ active: active }" :value="true" :overlay="false" position="bottom">
      <div v-show="active" class="header">
        <span>{{ title }}</span>
      </div>
      <div class="content">
        <div class="distance-block">
          <div class="value">{{ distance | distanceFormat }}</div>
          <div class="label">公里</div>
        </div>
        <div class="label-group">
          <div class="label-cell">
            <div class="value">{{ speed | formatSpeed }}</div>
            <div class="label">配速</div>
          </div>
          <div class="label-cell">
            <div class="value">{{ time | formatTime }}</div>
            <div class="label">时间</div>
          </div>
          <div class="label-cell">
            <div class="value">{{ calories }}</div>
            <div class="label">千卡</div>
          </div>
        </div>
      </div>
      <div v-if="status !== 3" class="map-icon" @click="mapToggle"></div>
      <div class="btn" v-show="active">
        <button @click="timerToggle" :class="{ primary: status !== 1 }">{{ btnText }}</button>
        <button v-if="status === 1" class="error" @click="handleStop">结束</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Dialog, Field } from 'vant'
import Map from '@/components/Map'
import { insertSportRecord } from '@/api/sport'
import { formatTime, formatSpeed } from '@/utils/format'
import { geoLocation, convertFrom } from '@/utils/map'
import sportTypes from '@/config/sportTypes'

export default {
  name: 'sport-map',
  components: {
    'van-popup': Popup,
    Map,
  },
  filters: {
    formatTime,
    formatSpeed,
    distanceFormat(value) {
      return (value / 1000).toFixed(1)
    },
  },
  data() {
    return {
      map: null, // 地图实例
      active: true, // 是否
      sportType: 'transfer', // 运动类型
      distance: 0, // 运动距离
      time: 0, // 运动时间
      status: 0, // 运动状态 0:未开始，1:进行中，2:暂停中，3:已结束
      timer: null, // 计时器
      watchId: null, // 定位监听器
      path: [[114.175328, 22.316554]], // 经过地点
    }
  },
  //[114.274328, 22.416554]
  computed: {
    title() {
      let str = ''
      sportTypes.forEach(item => {
        if (item.value === this.sportType) {
          str = item.label
          return
        }
      })
      return str
    },
    btnText() {
      if (this.status === 1) {
        return '暂停'
      } else if (this.status === 2) {
        return '继续'
      } else {
        return '开始'
      }
    },
    speed() {
      if (this.distance === 0) {
        return 0
      } else {
        return Math.ceil((1000 / this.distance)  * this.time)
      }
    },
    calories() {
      return (this.distance * 0.095).toFixed(1)
    },
  },
  mounted() {
    const type = this.$route.query.type
    this.sportType = type
    this.map = this.$refs.map
  },
  methods: {
    mapToggle() {
      this.active = !this.active
    },
    timerToggle() {
      if (this.status === 0 || this.status === 2) {
        this.status = 1
        this.countUp()
        this.watchPosition()
      } else if (this.status === 1) {
        this.status = 2
        clearInterval(this.timer)
        this.timer = null
        navigator.geolocation.clearWatch(this.watchId)
        this.watchId = null
      }
    },
    // 停止运动
    handleStop() {
      clearInterval(this.timer)
      navigator.geolocation.clearWatch(this.watchId)
      this.status = 3
      this.active = false
      this.submitRecord()
    },
    // 上传运动记录
    async submitRecord() {
      try {
        const formData = {
          type: this.sportType,
          path: this.path,
          distance: this.distance,
          time: this.time,
          speed: this.speed,
          calories: this.calories
        }
        const result = await insertSportRecord(formData)
        this.$toast('记录已保存')
      } catch (err) {
        console.log(err)
        this.$toast('记录上传失败')
      }
    },
    // 监听定位改变
    watchPosition() {
      try {
        if (!this.watchId) {
          const that = this
          this.watchId = navigator.geolocation.watchPosition(async (position) => {
            console.log(position)
            const gps = [position.coords.longitude, position.coords.latitude]
            const result  = await convertFrom(gps, 'gps')
            const p1 = [result.lng, result.lat]
            if (this.path.length > 0) {
              const p2 = that.path[that.path.length - 1]
              if (JSON.stringify(p1) !== JSON.stringify(p2)) {
                this.path.push(p1)
                const distance = Math.ceil(window.AMap.GeometryUtil.distance(p1, p2))
                that.distance += distance
              }
            } else {
              this.path.push(p1)
            }
            this.map.setPolyline(this.path) // 描绘运动轨迹
          })
        }
      } catch (err) {
        console.log(err)
        this.$toast('定位失败')
      }
    },
    // 轮询获取实时定位并且计算相关数据
    countUp() {
      this.timer = setInterval(async () => {
        this.time++
      }, 1000)
    },
  },
  beforeDestroy() {
    // 销毁计时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  },
}
</script>

<style lang="less" scoped>
.sport-map {
  height: 100%;
  color: #ccc;
  .over-lay {
    height: 20%;
    background-image: linear-gradient(rgba(25, 25, 25, 0.95) 0%, rgba(25, 25, 25, 1) 40%);
    transition: all ease-out 0.3s;
    .content {
      margin-top: 0;
      transition: all ease-out 0.2s;
      .distance-block {
        text-align: center;
        .value {
          font-size: 30px;
        }
      }
      .label-group {
        display: flex;
        margin-top: 20px;
        .label-cell {
          flex: 1;
          text-align: center;
        }
      }
      .label {
        font-size: 12px;
      }
      .value {
        font-style: italic;
      }
    }
    &.active {
      height: 100%;
      .content {
        margin-top: 100px;
        .distance-block {
          .value {
            font-size: 50px;
          }
        }
        .label-group {
          margin-top: 50px;
          .value {
            font-size: 20px;
          }
        }
      }
      .label {
        font-size: 15px;
      }
    }
    .header {
      position: relative;
      margin-top: 50px;
      text-align: center;
    }
    .map-icon {
      position: absolute;
      top: 50px;
      right: 30px;
      background-color: #f6f6f6;
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .btn {
      position: absolute;
      bottom: 150px;
      left: 0;
      right: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > button {
        width: 180px;
        height: 180px;
        margin: 30px;
        background-color: #ed880e;
        border: 1px solid #ed880e;
        border-radius: 50%;
        color: #fff;
        &.primary {
          background-color: #25c789;
          border: 1px solid #25c789;
        }
        &.error {
          background-color: #ed5436;
          border: 1px solid #ed5436;
        }
      }
    }
  }
}
</style>
