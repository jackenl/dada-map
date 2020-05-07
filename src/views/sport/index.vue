<template>
  <div class="sport">
    <div class="page-bg"></div>
    <header class="header">
      <div class="header-top" @click="onShowRecord">
        <div class="header-top-text">{{ distance | distanceFilter }}</div>
        <div class="header-top-label">累计{{ tabs[activeTab].title }}总公里</div>
      </div>
      <van-tabs
        v-model="activeTab"
        color="#fff"
        background="transparent"
        title-inactive-color="#eee"
        title-active-color="#fff"
        line-width="30px"
        line-height="2px"
        @change="onChange"
      >
        <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index" />
      </van-tabs>
    </header>
    <div class="map__wrapper">
      <div class="wrapper-content">
        <Map geolocation="default" height="111%" />
      </div>
      <div class="btn">
        <button @click="handleBegin">开始</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Tab, Tabs } from 'vant'
import Map from '@/components/Map'
import { getSportData } from '@/api/sport'

export default {
  name: 'sport',
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    Map
  },
  filters: {
    distanceFilter(value) {
      if (!value) value = 0
      return value.toFixed(1)
    }
  },
  data() {
    return {
      activeTab: 1,
      tabs: [
        { title: '健走', name: 'walking' },
        { title: '跑步', name: 'running' },
        { title: '骑行', name: 'riding' },
      ],
      sportType: 'running',
      sportData: {}
    }
  },
  computed: {
    distance() {
      return this.sportData[this.sportType]
    }
  },
  created() {
    this.getSportData()
  },
  methods: {
    onChange(index) {
      this.sportType = this.tabs[index].name
    },
    handleBegin() {
      const title = this.tabs[this.activeTab].title
      this.$router.push({
        path: '/sportMap',
        query: {
          title: title
        }
      })
    },
    async getSportData() {
      const result = await getSportData()
      this.sportData = result
    },
    onShowRecord() {
      this.$router.push('/sportRecord')
    }
  }
}
</script>

<style lang="less" scoped>
.sport {
  position: relative;
  height: calc(100% - 100px);
  .page-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 40%;
    background-image: linear-gradient(#0a96fa 80%, #f6f6f6);
    z-index: -1;
  }
  .header {
    padding: 50px 0 30px;
    &-top {
      color: #fff;
      text-align: center;
      margin-bottom: 30px;
      &-text {
        font-size: 40px;
      }
      &-label {
        font-size: 12px;
      }
    }
  }
  .map__wrapper {
    position: relative;
    height: 500px;
    margin: 0 20px;
    .wrapper-content {
      height: 100%;
      background-color: #fff;
      border: 5px solid #fff;
      border-radius: 20px;
      overflow: hidden;
    }
    .btn {
      position: absolute;
      bottom: -50px;
      left: 0;
      right: 0;
      width: 100%;
      text-align: center;
      > button {
        width: 150px;
        height: 150px;
        background-color: #25c789;
        border: 1px solid #25c789;
        border-radius: 50%;
        font-size: 20px;
        font-style: italic;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="less">
.sport {
  [class*='van-hairline']::after {
    border: none;
  }
}
</style>
