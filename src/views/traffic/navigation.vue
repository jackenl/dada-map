<template>
  <div class="navigation">
    <!-- 地图组件 -->
    <Map ref="map" height="103%" />
    <!-- 顶部框 -->
    <div class="search__wrapper">
      <div class="search-field">
        <div class="content">
          <div class="input-field">
            <div class="input-field-title">
              <span class="input-field-title-text">从</span>
            </div>
            <div class="input-field-main">
              <input
                :title="startPosition.name"
                v-model="startPosition.name"
                @input="autoInput(0)"
                @focus="onFocus"
                type="text"
              />
            </div>
          </div>
          <div class="input-field">
            <div class="input-field-title">
              <span class="input-field-title-text">到</span>
            </div>
            <div class="input-field-main">
              <input
                :title="endPosition.name"
                v-model="endPosition.name"
                @input="autoInput(1)"
                @focus="onFocus"
                type="text"
              />
            </div>
          </div>
        </div>
        <div class="right-icon" @click="onExchange">
          <van-icon class="exchange-icon" name="exchange" />
        </div>
      </div>
      <!-- 交通工具列表 -->
      <div class="tool-bar">
        <div
          v-for="tool in trafficTools"
          :key="tool.value"
          class="tool-cell"
          :class="tool.value === selectTool ? 'active' : ''"
          @click="changeTool(tool.value)"
        >
          <van-icon v-show="tool.value === selectTool" class-prefix="my-icon" :name="tool.icon" />
          {{ tool.label }}
        </div>
      </div>
    </div>
    <!-- 搜索提示抽屉 -->
    <van-popup class="popup tips-popup" v-model="tipsVisible" position="bottom" :overlay="false">
      <div class="header" @click="tipsVisible = false">
        <van-icon name="arrow-down" size="20" color="#333" />
      </div>
      <div class="content">
        <van-cell-group>
          <van-cell
            v-for="poi in poiList"
            :key="poi.id"
            :title="poi.name"
            :label="poi.address"
            @click="selectPosition(poi)"
          />
        </van-cell-group>
      </div>
    </van-popup>
    <!-- 路线规划抽屉 -->
    <van-popup
      class="popup route-popup"
      :class="routeDown ? 'down' : ''"
      :value="routeVisible"
      position="bottom"
      :overlay="false"
    >
      <div class="header" @click="adjustRouteHeight">
        <span class="text">请选择合适路线</span>
        <van-button type="info" size="small" :style="{ float: 'right' }" @click="handleSave">确定</van-button>
      </div>
      <div class="content">
        <!-- 路线规划展示 -->
        <div id="panel"></div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Map from '@/components/Map'
import { Popup, Icon, CellGroup, Cell, Button } from 'vant'
import { placeSearch, requestRoute } from '@/utils/map'
import { mapState, mapGetters } from 'vuex'
import { insertTravelRecord } from '@/api/travel'

export default {
  name: 'navigation',
  components: {
    'van-popup': Popup,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-button': Button,
    Map,
  },
  data() {
    return {
      startPosition: {
        name: '我的位置',
        location: '',
        address: '',
      }, // 起点位置
      startSelected: true, // 是否已选择起点
      endPosition: {
        name: '',
        location: '',
        address: '',
      }, // 终点位置
      endSelected: false, // 是否已选择终点
      inputType: 0, // 当前数据框 0：起点 1：终点
      poiList: '', // 位置搜索列表
      trafficTools: [
        {
          label: '公交地铁',
          value: 'Transfer',
          icon: 'transfer',
        },
        {
          label: '驾车',
          value: 'Driving',
          icon: 'drive',
        },
        {
          label: '骑行',
          value: 'Riding',
          icon: 'ride',
        },
        {
          label: '步行',
          value: 'Walking',
          icon: 'walk',
        },
      ],
      selectTool: 'Transfer', // 所选交通工具
      tipsVisible: false, // 是否显示搜索提示
      routeVisible: false,
      routeDown: false,
      Polyline: null, // 交通路线规划实例
      routes: [],
    }
  },
  computed: {
    ...mapState('position', ['city', 'location']),
  },
  mounted() {
    this.getDistination()
  },
  methods: {
    // 搜索自动提示
    async autoInput(type) {
      this.inputType = type
      this.routeVisible = false
      if (type === 0) {
        this.startSelected = false
      } else {
        this.endSelected = false
      }
      const keywords = type === 0 ? this.startPosition.name : this.endPosition.name
      if (keywords) {
        try {
          const opts = {
            city: this.city,
            pageSize: 6,
          }
          this.poiList = await placeSearch(opts, keywords)
        } catch (err) {
          console.log('获取提示信息失败：', err)
        }
      }
    },
    onFocus() {
      this.tipsVisible = true
    },
    onExchange() {
      const position = this.startPosition
      this.startPosition = this.endPosition
      this.endPosition = position
      const select = this.startSelected
      this.startSelected = this.endSelected
      this.endSelected = select
      this.getRoute()
    },
    changeTool(value) {
      this.selectTool = value
      this.getRoute()
    },
    // 选择地点
    selectPosition(poi) {
      this.tipsVisible = false
      if (this.inputType === 0) {
        this.startPosition = poi
        this.startSelected = true
      } else {
        this.endPosition = poi
        this.endSelected = true
      }
      this.getRoute()
    },
    // 获取路线规划
    async getRoute() {
      if (this.startSelected && this.endSelected) {
        try {
          this.routeVisible = true
          const map = this.$refs.map.map // 获取map实例
          const opts = {
            map: map,
            city: this.city,
            panel: 'panel',
            autoFitView: true,
          }
          const plugin = `AMap.${this.selectTool}`
          if (this.startPosition.name === '我的位置') {
            this.$set(this.startPosition, 'location', this.location)
          }
          if (this.endPosition.name === '我的位置') {
            this.$set(this.endPosition, 'location', this.location)
          }
          if (this.Polyline) {
            this.Polyline.clear() // 清除路线规划实例
          }
          const result = await requestRoute(plugin, opts, this.startPosition.location, this.endPosition.location)
          this.Polyline = result.plugin
          this.routes = result.routes
        } catch (err) {
          console.log('路线规划失败:', err)
          this.routeVisible = false
          this.$toast('尚未检测到匹配路线')
        }
      }
    },
    getDistination() {
      if (this.$route.query.keywords && this.$route.query.loc) {
        this.endPosition.name = this.$route.query.keywords
        const loc = this.$route.query.loc.split(',')
        this.endPosition.location = new window.AMap.LngLat(Number(loc[0]), Number(loc[1]))
        this.endSelected = true
        this.getRoute()
      }
    },
    // 调整路线规划弹窗高度
    adjustRouteHeight() {
      this.routeDown = !this.routeDown
    },
    // 保存出行记录
    async handleSave() {
      try {
        const startLngLat = [this.startPosition.location.lng, this.startPosition.location.lat]
        const endLngLat = [this.endPosition.location.lng, this.endPosition.location.lat]
        const record = {
          type: this.selectTool.toLowerCase(),
          distance: this.routes[0].distance,
          time: this.routes[0].time,
          start: startLngLat,
          end: endLngLat,
          city: this.city,
        }
        const result = await insertTravelRecord(record)
        this.$toast('记录保存成功')
        this.$router.push('/')
      } catch (err) {
        this.$toast('记录保存失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.navigation {
  position: relative;
  height: 100%;
  overflow: hidden;
  .search__wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #fff;
    .search-field {
      display: flex;
      align-items: center;
      margin: 20px 50px;
      background-color: #f5f5f5;
      border-radius: 10px;
      overflow: hidden;
      .content {
        flex: 1;
        .input-field {
          height: 80px;
          line-height: 80px;
          display: flex;
          align-items: center;
          &-title {
            width: 100px;
            text-align: center;
            font-size: 12px;
            color: #999;
          }
          &-main {
            flex: 1;
            & > input {
              display: block;
              width: 100%;
              border: none;
              background-color: inherit;
              color: #333;
              &:first-child {
                border-bottom: 1px solid #eee;
              }
              &[title='我的位置'] {
                color: #1989fa;
              }
            }
          }
        }
      }
      .right-icon {
        width: 100px;
        text-align: center;
        .exchange-icon {
          transform: rotate(90deg);
          font-size: 20px;
          color: #333;
        }
      }
    }
    .tool-bar {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 20px 0;
      .tool-cell {
        height: 50px;
        line-height: 50px;
        padding: 0 15px;
        font-size: 14px;
        color: #333;
        text-align: center;
        border-radius: 25px;
        transition: all ease-in 0.3s;
        &.active {
          background-color: #1989fa;
          color: #fff;
          font-weight: 500;
        }
      }
    }
  }
  .popup {
    &.tips-popup {
      height: calc(100% - 300px);
      .header {
        text-align: center;
      }
    }
    &.route-popup {
      height: 50%;
      transition: all ease-out 0.3s;
      &.down {
        height: 60px;
      }
    }
    .header {
      padding: 0 10px;
      overflow: hidden;
      .text {
        font-size: 13px;
        color: #999;
        line-height: inherit;
      }
    }
    .content {
      height: calc(100% - 60px);
      overflow: auto;
    }
  }
}
</style>
<style lang="less">
.navigation {
  .van-cell {
    &__title {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &__label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>
