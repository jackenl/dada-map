<template>
  <div class="user-info">
    <div class="container">
      <!-- 头部信息 -->
      <header class="hearder">
        <div class="avatar">
          <van-icon class-prefix="my-icon" name="user" size="40" color="#999"></van-icon>
        </div>
        <div class="user-name">{{ userInfo.nickname }}</div>
        <div class="more-info">
          <span>男</span>
          <span>广东省，广州市</span>
        </div>
        <!-- 社交数据统计 -->
        <desc-list></desc-list>
      </header>
    </div>
    <div class="sigout-btn" @click="handleLogout">退出登陆</div>
  </div>
</template>

<script>
import { Icon } from 'vant'
import DescList from './components/desc-list'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'user-info',
  components: {
    'van-icon': Icon,
    DescList
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout() {
      this.logout()
    }
  }
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  height: 100%;
  background-color: #fff;
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
  .sigout-btn {
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
</style>