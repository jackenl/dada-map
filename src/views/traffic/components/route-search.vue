<template>
  <div class="route-search">
    <div class="search_field">
      <div class="content">
        <div class="input-field">
          <div class="title">从</div>
          <div class="main">
            <input v-model="startLocation" type="text" placeholder="起点">
          </div>
        </div>
        <div class="input-field">
          <div class="title">到</div>
          <div class="main">
            <input v-model="endLocation" type="text" placeholder="终点">
          </div>
        </div>
      </div>
      <div class="right-icon"></div>
    </div>
    <van-popup v-model="tipsVisible">
      内容
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
import { placeSearch } from '@/utils/map'
import { mapState } from 'vuex'

export default {
  name: 'route-search',
  components: {
    'van-popup': Popup
  },
  data() {
    return {
      startLocation: '我的位置', // 起点
      endLocation: '', // 终点
      poiList: '', // 位置搜索列表
      tipsVisible: false, // 是否显示搜索提示
    }
  },
  computed: {
    ...mapState('position', 'city')
  },
  created() {},
  mounted() {},
  methods: {
    // 搜索自动提示
    async autoInput(keywords) {
      try {
        const opts = {
          city: this.city
        }
        this.poiList = await placeSearch(opts, keywords)
      } catch (err) {
        console.err(err.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.route-search {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  .search-field {
    display: flex;
    padding: 30px;
    align-items: center;
  }
}
</style>
