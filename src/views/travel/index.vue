<template>
  <div class="travel">
    <van-tabs color="#1989fa" title-active-color="#1989fa">
      <van-tab v-for="(tab, index) in tabs" :title="tab.title" :key="index">
        <div class="travel-content">
          <p>累计{{ tab.title }}</p>
          <p>0.00</p>
          <p>本月{{ tab.title }}0.00公里</p>
        </div>
        <van-button class="btn" type="primary" block round>开始{{ tab.title }}</van-button>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tab, Tabs, Button } from 'vant'

export default {
  name: 'travel',
  components: {
    'van-tabs': Tabs,
    'van-tab': Tab,
    'van-button': Button
  },
  data() {
    return {
      activeTab: 0,
      tabs: [
        { title: '跑步', name: 'running' },
        { title: '骑行', name: 'cycling' },
        { title: '自驾', name: 'driving' },
      ],
    }
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.travel {
  position: relative;
  height: calc(100% - 100px);
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: url(../../assets/img/travel-bg.jpg);
    background-size: 100% 100%;
    opacity: 0.6;
  }
  &-content {
    width: 450px;
    height: 450px;
    margin: 100px auto;
    border: 8px dashed #c5d1d3;
    border-bottom: none;
    border-radius: 250px;
    & > p {
      text-align: center;
      &:nth-child(1) {
        margin-top: 80px;
        color: #666;
        font-size: 18px;
        letter-spacing: 2px;
      }
      &:nth-child(2) {
        margin-top: 40px;
        color: #666;
        font-size: 60px;
        font-weight: 500;
      }
      &:nth-child(3) {
        margin-top: 80px;
        font-size: 14px;
        line-height: 1.5;
        color: #999;
        text-decoration: underline;
        &:after {
          display: inline;
          content: '>'
        }
      }
    }
  }
  .btn {
    width: 500px;
    margin: 0 auto;
    opacity: 0.8;
  }
}
</style>
