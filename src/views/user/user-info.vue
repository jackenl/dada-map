<template>
  <div class="user-info">
    <div class="container">
      <!-- 头部信息 -->
      <header class="hearder">
        <div class="avatar">
          <van-icon class-prefix="my-icon" name="user" size="40" color="#999"></van-icon>
        </div>
        <div class="user-name">jacken</div>
        <div class="more-info">
          <span>男</span>
          <span>广东省，广州市</span>
        </div>
        <!-- 社交数据统计 -->
        <desc-list></desc-list>
      </header>
    </div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import DescList from './components/desc-list'

export default {
  name: 'user-info',
  components: {
    'van-icon': Icon,
    DescList
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  height: 100%;
  .container {
    height: 100%;
    padding-top: 200px;
    overflow: auto;
    .header {
      background-color: #fff;
      position: relative;
      .avatar {
        position: absolute;
        top: 50px;
        left: 30px;
        width: 120px;
        height: 120px;
        box-sizing: padding-box;
        border: 10px solid #fff;
        border-radius: 60px;
        overflow:hidden;
      }
    }
  }
}
</style>