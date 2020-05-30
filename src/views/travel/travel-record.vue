<template>
  <div class="travel-record">
    <div class="header">
      <h3 class="title">所有行程</h3>
      <div class="content">
        <div class="content-value">
          <span>{{ allDistance | formatDistance }}</span> 公里
        </div>
        <div class="content-label">共 {{ total }} 次出行</div>
      </div>
    </div>
    <van-empty v-if="recordList.length === 0" description="暂无记录" />
    <van-list
      v-else
      class="record-list"
      v-model="loading"
      :immediate-check="false"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="record in recordList" :key="record.id" center @click="onShowDetail(record.id)">
        <div slot="title">出行方式：{{ record.tool }}</div>
        <div slot="label" class="cell-label">
          <div class="label-tag">距离：{{ record.distance | formatDistance }}公里</div>
          <div class="label-tag">用时：{{ record.time | formatTime }}</div>
        </div>
        <div slot="default">{{ record.create_time | formatDate }}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { List, Cell, Empty } from 'vant'
import { getTravelRecordsByPage, getTravelData } from '@/api/travel'
import trafficTools from '@/config/trafficTools'
import { parseTime } from '@/utils/index'
import { formatDistance, formatTime } from '@/utils/format'

export default {
  name: 'travel-record',
  components: {
    'van-list': List,
    'van-cell': Cell,
    'van-empty': Empty,
  },
  filters: {
    formatDistance,
    formatTime,
    formatDate(value) {
      return parseTime(value, '{y}.{m}.{d}')
    },
  },
  data() {
    return {
      recordList: [],
      allDistance: 0,
      pageSize: 10,
      page: 1,
      total: 0,
      loading: false,
      finished: false,
      error: false,
    }
  },
  created() {
    this.getTravelData()
    this.onLoad()
  },
  methods: {
    async getTravelData() {
      const result = await getTravelData()
      this.allDistance = result.all
    },
    async onLoad() {
      try {
        const formData = {
          page: this.page++,
          pageSize: this.pageSize,
        }
        const result = await getTravelRecordsByPage(formData)
        result.rows.forEach((record) => {
          trafficTools.forEach((item) => {
            if (item.value === record.type) {
              record.tool = item.label
            }
          })
        })
        this.recordList = this.recordList.concat(result.rows)
        this.total = result.total
        this.loading = false
        if (this.recordList.length >= this.total) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
    },
    onShowDetail(id) {
      this.$router.push({
        path: '/travelDetail',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.travel-record {
  .header {
    height: 300px;
    background-color: #0a96fa;
    color: #fff;
    text-align: center;
    .title {
      padding: 20px 0;
      font-size: 14px;
    }
    .content {
      &-value {
        font-size: 12px;
        & > span {
          font-size: 35px;
        }
      }
      &-label {
        font-size: 14px;
      }
    }
  }
  .record-list {
    .cell-label {
      display: flex;
      .label-tag {
        margin-right: 30px;
      }
    }
  }
}
</style>
<style lang="less">
.travel-record {
  .van-cell {
    &__value {
      flex: 0 1 auto;
    }
  }
}
</style>
