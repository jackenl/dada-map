<template>
  <div class="nearby">
    <!-- 推荐轮播 -->
    <recommend-swipe :keyword="searchValue" />
    <!-- 推荐列列表 -->
    <div class="recommend">
      <van-cell-group title="猜你喜欢">
        <van-cell v-for="(recommend, index) in recommendList.poi_list" :key="index">
          <div class="recommend-cell" slot="title" @click="onShowRecommend(recommend.id)">
            <img class="pic-info" :src="getDomainInfo(recommend.domain_list, 'pic_info')">
            <div class="recommend-content">
              <div class="recommend-name">{{ recommend.name }}</div>
              <div class="recommend-main">
                <van-rate :value="getRating(recommend.rating)" size="14px" />
                <span class="recommend-rate">{{ recommend.rating }}</span>
                <span class="recommend-money" v-html="`${getDomainInfo(recommend.domain_list, 'price')}`"></span>
              </div>
              <div class="recommend-tag" v-html="`${getDomainInfo(recommend.domain_list, 'tag')}`"></div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 头部搜索框 -->
    <van-search
      class="search__wrapper"
      v-model="searchValue"
      shape="round"
      background="#1989fa"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <div class="search-left" slot="left">
        <span>{{ cityText }}</span>
        <van-icon class="icon-arrow" name="arrow-down" size="13"></van-icon>
      </div>
    </van-search>
  </div>
</template>

<script>
import { Search, Icon, CellGroup, Cell, Rate } from 'vant'
import RecommendSwipe from './components/recommend-swipe'
import { mapGetters } from 'vuex'
import { recommend } from '@/api/nearby'

export default {
  name: 'nearby',
  components: {
    'van-search': Search,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-rate': Rate,
    RecommendSwipe,
  },
  data() {
    return {
      searchValue: '',
      recommendList: {}
    }
  },
  computed: {
    ...mapGetters('position', ['cityText', 'lnglat', 'cityCode']),
  },
  created() {
    this.getRecommend()
  },
  methods: {
    onSearch() {
      const path = `https://uri.amap.com/search?keyword=${this.searchValue}&center=${this.lnglat}&city=${this.cityCode}&view=list&src=mypage&coordinate=gaode&callnative=0`
      window.location.href = path
    },
    async getRecommend() {
      this.recommendList = await recommend()
    },
    getDomainInfo(domain_list, name) {
      let str = ''
      domain_list.forEach(item => {
        if (item.name === name) {
          str = item.value
        }
      })
      return str
    },
    getRating(value) {
      return Number(value)
    },
    onShowRecommend(id) {
      location.replace(`https://m.amap.com/detail/index/poiid=${id}`)
    }
  },
}
</script>

<style lang="less" scoped>
.nearby {
  position: relative;
  height: calc(100% - 100px);
  padding-top: 130px;
  .search__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .search-left {
      margin-right: 24px;
      font-size: 14px;
      font-weight: 500;
      .icon-arrow {
        margin-left: 10px;
      }
    }
  }
  .recommend {
    background-color: #fff;
    margin-top: 50px;
    margin-bottom: 150px;
    .recommend-cell {
      display: flex;
      .pic-info {
        width: 150px;
        margin-right: 30px;
      }
      .recommend-main {
        display: flex;
        align-items: center;
        .recommend-rate {
          display: inline-block;
          font-size: 12px;
          padding-right: 20px;
          line-height: 1;
        }
        .recommend-money {
          font-size: 12px;
          line-height: 1;
        }
      }
    }
  }
}
</style>
