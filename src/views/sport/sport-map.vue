<template>
  <div class="sport-map">
    <Map height="103%" />
    <van-popup class="over-lay" :class="{ active: active }" :value="overlay" :overlay="false" position="bottom">
      <div v-show="active" class="header">
        <span>{{ title }}</span>
      </div>
      <div class="content">
        <div class="distance-block">
          <div class="value">{{ count.distance | distanceFormat }}</div>
          <div class="label">公里</div>
        </div>
        <div class="label-group">
          <div class="label-cell">
            <div class="value">{{ count.speed | speedFormat }}</div>
            <div class="label">配速</div>
          </div>
          <div class="label-cell">
            <div class="value">{{ count.time | timeFormat }}</div>
            <div class="label">时间</div>
          </div>
          <div class="label-cell">
            <div class="value">{{ count.calories | caloriesFormat }}</div>
            <div class="label">千卡</div>
          </div>
        </div>
      </div>
      <div class="map-icon" @click="mapToggle"></div>
      <div class="btn" v-show="active">
        <button @click="timerToggle" :class="{ primary: status }">{{ btnText }}</button>
        <button v-if="status === 1" class="error" @click="handleStop">结束</button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Dialog, Field } from 'vant'
import Map from '@/components/Map'
import { timeFormat, speedFormat } from '@/utils/format';

export default {
  name: 'sport-map',
  components: {
    'van-popup': Popup,
    Map
  },
  filters: {
    timeFormat: timeFormat,
    speedFormat: speedFormat,
    distanceFormat(value) {
      return Math.floor(value / 1000).toFixed(2)
    },
    caloriesFormat(value) {
      return Math.floor(value / 10).toFixed(1)
    }
  },
  data() {
    return {
      overlay: false,
      active: true,
      title: '跑步',
      count: {
        distance: 0,
        speed: 0,
        time: 0,
        calories: 0,
      },
      status: 0,
      timer: null
    }
  },
  computed: {
    btnText() {
      if (this.status === 1) {
        return '继续'
      } else {
        return '暂停'
      }
    }
  },
  mounted() {
    this.title = this.$route.query.title || ''
    this.overlay = true
    this.timer = setInterval(() => {
      this.count.time++
    }, 1000);
  },
  methods: {
    mapToggle() {
      this.active = !this.active
    },
    timerToggle() {
      if (this.status === 1) {
        this.status = 0
        this.countUp()
      } else if (this.status === 0) {
        this.status = 1
        clearInterval(this.timer)
        this.timer = null
      }
    },
    // 停止运动
    handleStop() {
      clearInterval(this.timer)
      this.overlay = false
      this.$toast('记录已保存')
      const timer = setTimeout(() => {
        this.$router.go(-1)
      }, 2000);
    },
    // 计算时间
    countUp() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
      this.timer = setInterval(() => {
        this.count.time++
      }, 1000);
    }
  },
  beforeDestroy() {
    // 销毁计时器
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less" scoped>
.sport-map {
  height: 100%;
  color: #ccc;
  .over-lay {
    height: 20%;
    background-image: linear-gradient(rgba(25, 25, 25, 0.95) 0%, rgba(25, 25, 25, 1) 40%);
    transition: all ease-out .3s;
    .content {
      margin-top: 0;
      transition: all ease-out .2s;
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
