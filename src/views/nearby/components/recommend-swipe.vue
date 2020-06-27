<template>
  <van-swipe class="recommend-swipe" autoplay="none">
    <van-swipe-item v-for="(item, index) in recommends" class="recommend-list" :key="index">
      <template v-for="recommend in item">
        <div
          class="recommend-cell"
          :key="recommend.value"
          :keyword="recommend.label"
          @click="getRecommend(recommend.keyword)"
        >
          <div class="recommend-icon" :class="recommend.value"></div>
          <div class="recommend-cell-text">{{ recommend.label }}</div>
        </div>
      </template>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
import { mapGetters } from 'vuex'

export default {
  name: 'recommend-swipe',
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem,
  },
  data() {
    return {
      recommends: [
        [
          { label: '美食', value: 'food', keyword: '' },
          { label: '酒店', value: 'hotel', keyword: '酒店' },
          { label: '电影', value: 'movie', keyword: '' },
          { label: '景点', value: 'viewpoint', keyword: '' },
          { label: '银行', value: 'bank', keyword: '' },
          { label: '网吧', value: 'internet', keyword: '' },
          { label: '购物', value: 'shopping', keyword: '' },
          { label: '公厕', value: 'toilet', keyword: '' },
        ],
        [
          { label: '公交', value: 'bus', keyword: '' },
          { label: '地铁', value: 'subway', keyword: '' },
          { label: '停车场', value: 'carpark', keyword: '' },
          { label: '更多', value: 'more', keyword: '' },
        ],
      ],
    }
  },
  computed: {
    ...mapGetters('position', ['lnglat', 'cityCode']),
  },
  methods: {
    getRecommend(keyword) {
      // let path = ''
      // if (keyword === '更多') {
      //   const currentPage = encodeURIComponent(window.location.href)
      //   path = `https://m.amap.com/searchmore/index/type=nearby&wm_referrer=${currentPage}&user_loc=${this.lnglat}`
      // } else {
      //   path = `https://uri.amap.com/nearby?service=${keyword}&location=${this.lnglat}&city=${this.cityCode}&src=mypage&coordinate=gaode`
      // }
      // this.$router.push({
      //   path: '/search',
      //   query: {
      //     url: path,
      //   },
      // })
      this.$router.push({
        path: '/search',
        query: {
          title: keyword
        }
      })
    },
  },
}
</script>

<style lang="less" scoped>
.recommend-swipe {
  background-color: #fff;
  .recommend-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 80px;
    .recommend-cell {
      width: 25%;
      margin-top: 50px;
      .recommend-icon {
        width: 72px;
        height: 72px;
        margin: 0 auto;
        border-radius: 36px;
        background: url('../../../assets/img/search-icons.png') no-repeat;
        background-size: 116px 1356px;
        &.food {
          background-color: #fc9c1e;
          background-position: -18px -250px;
        }
        &.hotel {
          background-color: #398eff;
          background-position: center -366px;
        }
        &.movie {
          background-color: #f26cd9;
          background-position: center -682px;
        }
        &.viewpoint {
          background-color: #00c5c3;
          background-position: center -798px;
        }
        &.bank {
          background-color: #a671ff;
          background-position: center -22px;
        }
        &.internet {
          background-color: #6f81f2;
          background-position: center -478px;
        }
        &.shopping {
          background-color: #f57799;
          background-position: -20px -1034px;
        }
        &.toilet {
          background-color: #398eff;
          background-position: -18px -1264px;
        }
        &.bus {
          background-color: #2da0f7;
          background-position: center -138px;
        }
        &.subway {
          background-color: #35c49f;
          background-position: -19px -1143px;
        }
        &.carpark {
          background-color: #53a2fc;
          background-position: center -798px;
        }
        &.more {
          background-color: #84b7fa;
          background-position: center -580px;
        }
      }
      &-text {
        text-align: center;
        font-size: 13px;
        margin-top: 20px;
        color: #666;
      }
    }
  }
}
</style>
