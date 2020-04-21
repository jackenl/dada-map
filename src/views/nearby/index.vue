<template>
  <div class="nearby">
    <!-- 推荐轮播 -->
    <recommend-swipe :keyword="searchValue" />
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
import { Search, Icon } from 'vant'
import RecommendSwipe from './components/recommend-swipe'
import { mapGetters } from 'vuex'

export default {
  name: 'nearby',
  components: {
    'van-search': Search,
    'van-icon': Icon,
    RecommendSwipe,
  },
  data() {
    return {
      searchValue: '',
    }
  },
  computed: {
    ...mapGetters('position', ['cityText', 'location', 'cityCode']),
  },
  methods: {
    onSearch() {
      const path = `https://uri.amap.com/search?keyword=${this.searchValue}&center=${this.location}&city=${this.cityCode}&view=list&src=mypage&coordinate=gaode&callnative=0`
      window.location.href = path;
    },
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
}
</style>
