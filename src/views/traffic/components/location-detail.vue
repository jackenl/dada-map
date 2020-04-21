<template>
  <van-popup
    :value="value"
    class="location-detail"
    position="bottom"
    :overlay="false"
  >
    <div class="header">
      <h3 class="title">{{ markPosition.name }}</h3>
    </div>
    <div class="content">
      <span>距您{{ distance }}公里</span>
      <span>{{ markPosition.district }}</span>
    </div>
    <div class="footer">
      <div class="footer-left" @click="getNearby">
        <van-icon name="location-o" />
        附近
      </div>
      <div class="footer-right" @click="getRoutes">
        <van-icon class="icon" class-prefix="my-icon" name="roeute-line"></van-icon>
        路线
      </div>
    </div>
  </van-popup>
</template>

<script>
import { Popup, Icon } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'location-detail',
  props: {
    markPosition: {
      type: Object,
      default: () => {
        return {
          name: '',
          address: '',
          district: '',
          location: null
        }
      }
    },
    value: {
      type: Boolean,
      default: () => false
    }
  },
  components: {
    'van-popup': Popup,
    'van-icon': Icon,
  },
  computed: {
    ...mapGetters('position', ['location']),
    distance() {
      const markLocation = this.markPosition.location
      let distance = 0
      if (markLocation) {
        const p1 = [markLocation.lng, markLocation.lat]
        const p2 = this.location
        distance = window.AMap.GeometryUtil.distance(p1, p2)
      }
      return (distance / 1000).toFixed(1)
    },
  },
  methods: {
    getNearby() {
      if (this.markPosition.adcode) {
        const location = this.markPosition.location
        const path = `https://m.amap.com/searchmore/index/user_loc=${this.markPosition.name}%2C${location.lng}%2C${location.lat}`
        window.location.href = path
      }
    },
    getRoutes() {
      console.log('route')
    }
  },
}
</script>

<style lang="less" scoped>
.location-detail {
  height: 20%;
  border-radius: 20px 20px 0 0;
  padding: 30px 30px 0;
  .header {
    margin-top: 20px;
    .title {
      font-size: 18px;
      color: #333;
      line-height: 1;
    }
  }
  .content {
    margin-top: 20px;
    & > span {
      display: inline-block;
      padding-right: 20px;
      font-size: 14px;
      color: #999;
      line-height: 1;
      &:first-child {
        &:after {
          display: inline-block;
          content: '';
          position: relative;
          left: 20px;
          border-right: 1px solid #ccc;
          height: 28px;
          vertical-align: top;
        }
      }
      &:last-child {
        padding-left: 20px;
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    display: flex;
    width: calc(100% - 60px);
    & > div {
      flex: 1;
      height: 80px;
      line-height: 80px;
      border-top: 1px solid #eee;
      text-align: center;
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:active {
        background-color: rgba(0, 0, 0, 0.05);
      }
      .icon {
        vertical-align: top;
      }
    }
  }
}
</style>
