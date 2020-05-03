<template>
  <div class="user">
    <div class="container">
      <!-- 头部信息 -->
      <header class="header">
        <van-cell title-class="cell-title" value-class="cell-value" to="/userInfo" center is-link>
          <div class="avatar" slot="title">
            <van-icon v-if="!userInfo.avatar" class-prefix="my-icon" name="user" size="40" color="#999"></van-icon>
            <img v-else src="" />
          </div>
          <div class="cell-right" slot="default">
            <p class="cell-right-title">{{ userInfo.nickname }}</p>
            <div class="tag-list">
              <span class="tag-cell grade">Lv.5</span>
              <span class="tag-cell badge">2个徽章</span>
            </div>
          </div>
        </van-cell>
        <!-- 社交数据统计 -->
        <desc-list></desc-list>
      </header>
      <!-- 出行数据统计 -->
      <div class="travel-cell-group">
        <van-cell class="travel-cell city" to="/userMap" is-link>
          <p slot="title">点亮城市</p>
          <p slot="label">{{ cities }}个</p>
        </van-cell>
        <van-cell class="travel-cell mileage" is-link>
          <p slot="title">行程记录</p>
          <p slot="label">{{ distance }}公里</p>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell, CellGroup, Icon } from 'vant'
import DescList from './components/desc-list'
import { mapState } from 'vuex'
import { getTravelData } from '@/api/travel'

export default {
  name: 'user',
  components: {
    'van-cell': Cell,
    'van-icon': Icon,
    DescList,
  },
  data() {
    return {
      travelData: '', // 出行数据
    }
  },
  computed: {
    ...mapState('user', ['userInfo']),
    cities() {
      return this.travelData ? this.travelData.cities.length : 0
    },
    distance() {
      return this.travelData ? this.travelData.all : 0
    },
  },
  async created() {
    this.travelData = await getTravelData()
  },
}
</script>

<style lang="less" scoped>
.user {
  position: relative;
  height: calc(100% - 100px);
  background: url('../../assets/img/user_bg.jpg') no-repeat;
  background-size: 100%;
  .cell-title {
    width: 160px;
    flex: 0 1 auto;
  }
  .cell-value {
    text-align: left;
  }
  .container {
    height: 100%;
    padding-top: 200px;
    overflow: auto;
    .header {
      margin: 0 20px;
      border-radius: 20px;
      overflow: hidden;
      .avatar {
        width: 120px;
        height: 120px;
        border-radius: 60px;
        background-color: #eee;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        & > img {
          width: 100%;
          height: 100%;
        }
      }
      .cell-right {
        color: #333;
        &-title {
          font-size: 20px;
          line-height: 1;
        }
        .tag-list {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          .tag-cell {
            line-height: 1;
            background-color: #565eff;
            margin-right: 10px;
            padding: 0 10px;
            border-radius: 20px;
          }
        }
      }
    }
    .travel-cell-group {
      display: flex;
      .travel-cell {
        flex: 1;
        border-radius: 10px;
        margin: 20px;
        &:last-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
