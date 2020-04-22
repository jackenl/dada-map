<template>
  <div class="traffic">
    <!-- 地图实例 -->
    <Map ref="map" :plugins="['AMap.Scale']" height="104%" traffic satellite></Map>
    <!-- 提示抽屉 -->
    <van-popup class="tips-popup" v-model="tipsVisible" position="bottom" :overlay="false">
      <div class="header" @click="onClose">
        <svg-icon icon-class="user" />
      </div>
      <div class="content">
        <van-cell-group>
          <van-cell v-for="tip in tips" :key="tip.id" :title="tip.name" @click="getLocationDetail(tip)">
            <template #label>
              <span v-if="!tip.tags">{{ getAddress(tip) }}</span>
              <div v-else class="tag-list">
                <span v-for="(tag, index) in tip.tags" :key="index" :class="tagClass(tag)">{{ tag }}</span>
              </div>
            </template>
            <div v-if="tip.adcode" class="right-icon" slot="right-icon" @click.stop="getRoutes(tip)">
              <van-icon class-prefix="my-icon" name="route" size="20" color="#666" />
              <span>路线</span>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 详情抽屉 -->
    <location-detail v-model="detailVisible" :mark-position="markPosition"></location-detail>
    <!-- 顶部搜索栏 -->
    <div class="search__wrapper">
      <van-search
        v-model="searchValue"
        placeholder="查找地点"
        background="transparent"
        @input="autoInput"
      />
    </div>
    <div class="route-icon" @click="getNavigation">
      <van-icon class-prefix="my-icon" size="40" color="#1989fa" name="route"></van-icon>
    </div>
  </div>
</template>

<script>
import { Search, Popup, CellGroup, Cell, Icon } from 'vant'
import Map from '@/components/Map/Map'
import LocationDetail from './components/location-detail'
import { mapState } from 'vuex'
import { districtSearch, autoComplete } from '@/utils/map'

export default {
  name: 'traffic',
  components: {
    'van-search': Search,
    'van-popup': Popup,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-icon': Icon,
    Map,
    LocationDetail,
  },
  data() {
    return {
      searchValue: '', // 搜索框内容
      tipsVisible: false, // 是否显示搜索提示
      detailVisible: false, // 是否显示定点详情
      tips: [], // 输入提示数据
      markPosition: {
        name: '广州',
        address: '',
        district: '',
        location: null,
      }, // 标注点位置
    }
  },
  computed: {
    ...mapState('position', ['city']),
  },
  methods: {
    onFocus() {
      this.tipsVisible = true
      this.detailVisible = false
    },
    onClose() {
      this.tipsVisible = false
    },
    // 获取输入提示数据
    async autoInput() {
      if (this.searchValue) {
        try {
          const opts = {
            city: this.city,
          }
          this.tips = await autoComplete(opts, this.searchValue)
          this.tips.forEach((tip) => {
            // 如果是公交地铁站则变换address
            if (this.isStation(tip.name)) {
              tip.tags = tip.address.split(';').slice(0, 3)
            }
            // 如果为城市，则获取城市中心点
            if (tip.adcode && !tip.location) {
              const opts = {
                level: 'city',
                subdistrict: 0,
              }
              districtSearch(opts, tip.name).then((res) => {
                tip.location = res.center
              })
            }
          })
          this.tipsVisible = true
        } catch (err) {
          console.log('获取提示信息失败：', err)
        }
      }
    },
    getAddress(tip) {
      if (Array.isArray(tip.address) && tip.address.length === 0) {
        return tip.district
      } else {
        return tip.address
      }
    },
    isStation(name) {
      const stations = ['公交站', '地铁站']
      return stations.some((item) => {
        return name.indexOf(item) > -1
      })
    },
    tagClass(tag) {
      if (tag.indexOf('在建') > -1) {
        return 'tag default'
      } else {
        return 'tag normal'
      }
    },
    // 查看地点详情
    getLocationDetail(tip) {
      console.log(tip)
      if (tip.location) {
        this.tipsVisible = false
        this.detailVisible = true
        this.searchValue = tip.name
        this.markPosition = tip
        this.$refs.map.setMarker(tip.location)
      } else {
        this.searchValue = tip.name
        this.autoInput()
      }
    },
    // 查看导航路线
    getRoutes(tip) {
      const lnglat = [tip.location.lng, tip.location.lat]
      this.$router.push({
        path: '/navigation',
        query: {
          keywords: tip.name,
          loc: lnglat.toString()
        }
      })
    },
    getNavigation() {
      this.$router.push('/navigation')
    }
  },
}
</script>

<style lang="less" scoped>
.traffic {
  position: relative;
  height: calc(100% - 100px);
  margin-bottom: 100px;
  overflow: hidden;
  .container {
    width: 100%;
    height: 100%;
  }
  .search__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    margin-top: 10px;
  }
  .tips-popup {
    height: 90%;
    border-radius: 20px 20px 0 0;
    overflow: hidden;
    .header {
      text-align: center;
    }
    .content {
      height: calc(100% - 64px);
      overflow: auto;
      .tag-list {
        .tag {
          background-color: #999;
          border-radius: 5px;
          margin-right: 10px;
          padding: 0 10px;
          color: #fff;
          &:last-child {
            margin-right: 0;
          }
          &.normal {
            background-color: #1d98e0;
          }
        }
      }
      .right-icon {
        width: 80px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-shrink: 0;
        align-items: center;
        & > span {
          flex-shrink: 1;
          font-size: 12px;
          color: #999;
          line-height: 1;
        }
      }
    }
  }
  .route-icon {
    position: absolute;
    bottom: 200px;
    right: 30px;
    background-color: #fff;
    border-radius: 50%;
  }
}
</style>
<style lang="less">
.traffic {
  .van-cell {
    line-height: 36px;
  }
  .van-search__content {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.7);
  }
}
</style>
