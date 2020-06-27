<template>
  <div class="search">
    <div class="header">
      {{ title }}
    </div>
    <div class="nav">
      <div class="nav-item" :class="active === 1 ? 'active' : ''" @click="OrderDefault">推荐</div>
      <div class="nav-item" :class="active === 2 ? 'active' : ''" @click="OrderByPrice">
        <van-icon class="exchange-icon" name="exchange" />
        {{ priceOrderText }}
      </div>
      <div class="nav-item" :class="active === 3 ? 'active' : ''" @click="OrderByRate">
        <van-icon class="exchange-icon" name="exchange" />
        {{ RateOrderText }}
      </div>
    </div>
    <van-list
      class="recommend"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      offset="10"
      @load="fetchSearch"
    >
      <van-cell v-for="(recommend, index) in list" :key="index">
        <div class="recommend-cell" slot="title" @click="onShowRecommend(recommend.detail)">
          <img class="pic-info" :src="recommend.frontImg" />
          <div class="recommend-content">
            <div class="recommend-name">{{ recommend.title }}</div>
            <div class="recommend-main">
              <van-rate :value="recommend.avgScore" size="14px" />
              <span class="recommend-rate">{{ recommend.avgScore }}</span>
              人均
              <span class="recommend-money">¥{{ recommend.avgPrice }}</span>
            </div>
            <div class="recommend-label">{{ recommend.address }}</div>
          </div>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getList } from '@/api/nearby'
import { mapGetters } from 'vuex'
import { Cell, List, Rate, Icon } from 'vant'

export default {
  name: 'search',
  components: {
    'van-list': List,
    'van-cell': Cell,
    'van-rate': Rate,
    'van-icon': Icon,
  },
  data() {
    return {
      title: '',
      page: 0,
      pageSize: 10,
      list: [],
      total: 0,
      order: [],
      loading: false,
      active: 1,
      priceOrderText: '价格升序',
      RateOrderText: '评分降序',
    }
  },
  computed: {
    ...mapGetters('position', ['cityText']),
    finished() {
      return Math.round(this.total / this.pageSize) === this.page || this.total <= 10
    },
  },
  created() {
    this.title = this.$route.query.title || ''
    this.fetchSearch()
  },
  methods: {
    async fetchSearch() {
      this.loading = true
      const result = await getList({
        title: this.title,
        city: this.cityText,
        order: JSON.stringify(this.order),
        page: ++this.page,
        pageSize: this.pageSize,
      })
      this.loading = false
      this.list = this.list.concat(result.data.data.rows)
      if (!this.total) this.total = result.data.data.count
    },
    OrderDefault() {
      if (this.active !== 1) {
        this.active = 1
        this.list = []
        this.page = 0
        this.order = []
        this.fetchSearch()
      }
    },
    OrderByPrice() {
      this.active = 2
      this.list = []
      this.page = 0
      if (this.priceOrderText === '价格升序') {
        this.priceOrderText = '价格降序'
        this.order = [['avgPrice', 'DESC']]
      } else if (this.priceOrderText === '价格降序') {
        this.priceOrderText = '价格升序'
        this.order = [['avgPrice', 'ASC']]
      }
      this.fetchSearch()
    },
    OrderByRate() {
      this.active = 3
      this.list = []
      this.page = 0
      if (this.RateOrderText === '评分升序') {
        this.RateOrderText = '评分降序'
        this.order = [['avgScore', 'DESC']]
      } else if (this.RateOrderText === '评分降序') {
        this.RateOrderText = '评分升序'
        this.order = [['avgScore', 'ASC']]
      }
      this.fetchSearch()
    },
    onShowRecommend(url) {
      this.$router.push({
        path: '/iframe',
        query: {
          url
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.search {
  .header {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #ccc;
    font-weight: 500;
    text-align: center;
  }
  .nav {
    display: flex;
    height: 70px;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ccc;
    color: #999;
    &-item {
      .exchange-icon {
        transform: rotate(90deg);
      }
      &.active {
        color: #333;
      }
    }
  }
  background-color: #fff;
  min-height: 100%;
  .recommend {
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 150px;
    .recommend-cell {
      display: flex;
      .pic-info {
        width: 150px;
        height: 150px;
        margin-right: 30px;
      }
      .recommend-main {
        display: flex;
        align-items: center;
        .recommend-rate {
          display: inline-block;
          font-size: 12px;
          padding-left: 5px;
          padding-right: 20px;
          color: #999;
          line-height: 28px;
        }
        .recommend-money {
          font-size: 12px;
          line-height: 28px;
          color: red;
        }
      }
      .recommend-label {
        font-size: 12px;
      }
    }
  }
}
</style>
