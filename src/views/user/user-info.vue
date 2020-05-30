<template>
  <div class="user-info">
    <div class="container">
      <!-- 头部信息 -->
      <header class="header">
        <div class="avatar">
          <van-icon v-if="!userInfo.avatar" class-prefix="my-icon" name="user" size="40" color="#999"></van-icon>
          <img v-else class="avatar-img" :src="userInfo.avatar" />
        </div>
        <div class="change-bar">
          <van-button class="info-btn" type="default" size="small" round>编辑资料</van-button>
        </div>
        <div class="user-name">{{ userInfo.nickname }}</div>
        <div class="more-info">
          <span>{{ userInfo.sex | formatSex }}</span>
          <span>{{ userInfo.address | formatValue }}</span>
        </div>
        <!-- 社交数据统计 -->
        <desc-list></desc-list>
      </header>

      <!-- 运动数据 -->
      <div class="sport-list">
        <div class="sport-list-title">
          <span>运动数据</span>
        </div>
        <div class="sport-list-content">
          <div class="sport-total">
            总运动
            <span>{{ sportData.all | formatDistance }}</span>
            公里
          </div>
          <div v-for="sport in sportTypes" class="sport-item" :key="sport.value">
            <div class="sport-item-icon" :class="sport.value">
              <van-icon class-prefix="my-icon" :name="getIconName(sport.value)" color="#fff" size="14"></van-icon>
            </div>
            <div class="sport-item-main">
              <div class="sport-item-main-title">
                {{ sport.label }}总距离 {{ sportData[sport.value] | formatDistance }} 公里
              </div>
              <div class="sport-item-main-label">
                最远距离 5.6 公里
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sigout-btn" @click="handleLogout">退出登陆</div>
  </div>
</template>

<script>
import { Icon, Button } from 'vant'
import DescList from './components/desc-list'
import { mapState, mapActions } from 'vuex'
import sportTypes from '@/config/sportTypes'
import { getSportData } from '@/api/sport'
import { formatDistance } from '@/utils/format'

export default {
  name: 'user-info',
  components: {
    'van-icon': Icon,
    'van-button': Button,
    DescList,
  },
  filters: {
    formatSex(value) {
      if (value === 1) {
        return '男'
      } else if (value === 2) {
        return '女'
      } else {
        return '未知'
      }
    },
    formatValue(value) {
      return value ? value : '未知'
    },
    formatDistance: formatDistance
  },
  data() {
    return {
      sportTypes: sportTypes,
      sportData: {}
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
  },
  created() {
    this.getSportData()
  },
  methods: {
    ...mapActions('user', ['logout']),
    handleLogout() {
      this.logout()
    },
    async getSportData() {
      this.sportData = await getSportData()
    },
    getIconName(value) {
      if (value === 'riding') {
        return 'ride'
      } else {
        return 'walk'
      }
    }
  },
}
</script>

<style lang="less" scoped>
.user-info {
  position: relative;
  min-height: 120%;
  &:before {
    position: absolute;
    top: 0;
    display: block;
    width: 100%;
    height: 280px;
    content: '';
    background-image: url('../../assets/img/user_bg.jpg');
    background-size: 100%;
  }
  .container {
    padding-top: 280px;
    overflow: auto;
    .header {
      position: relative;
      background-color: #fff;
      padding: 20px;
      .avatar {
        position: absolute;
        top: -75px;
        width: 140px;
        height: 140px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
        border: 5px solid #fff;
        border-radius: 50%;
        overflow: hidden;
        &-img {
          width: 140px;
          height: 140px;
        }
      }
      .change-bar {
        height: 70px;
        .info-btn {
          float: right;
          color: #666;
        }
      }
      .user-name {
        font-size: 20px;
        color: #333;
      }
      .more-info {
        margin: 20px 0;
        font-size: 12px;
        color: #999;
        & > span {
          &:first-child {
            &:after {
              display: inline-block;
              content: '';
              border-right: 1px solid #ccc;
              height: 20px;
              margin: 0 20px;
            }
          }
        }
      }
    }
    .sport-list {
      margin-top: 30px;
      padding: 30px 20px;
      background-color: #fff;
      &-title {
        font-size: 12px;
      }
      &-content {
        .sport-total {
          text-align: center;
        }
        .sport-item {
          display: flex;
          align-items: center;
          background-color: #f6f6f6;
          margin-top: 30px;
          padding: 20px 0;
          border-radius: 15px;
          overflow: hidden;
          &:last-child {
            margin-bottom: 40px;
          }
          & > div {
            flex: 0 0 auto;
          }
          &-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 50px;
            margin: 0 25px;
            border-radius: 50%;
            overflow: hidden;
            &.walking {
              background-color: #0a96fa;
            }
            &.running {
              background-color: #24c789;
            }
            &.riding {
              background-color: #333;
            }
          }
          &-main {
            &-title {
              font-size: 14px;
              color: #333;
              margin-bottom: 10px;
            }
            &-label {
              font-size: 12px;
              color: #333;
            }
          }
        }
      }
    }
  }
  .sigout-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 14px;
    color: #fff;
  }
}
</style>
