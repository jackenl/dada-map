<template>
  <!-- 社交数据统计 -->
  <div class="desc-list">
    <div v-for="(item, index) in descData" class="desc-cell" :key="index">
      <span class="desc-cell-value">{{ item.count }}</span>
      <p class="desc-cell-title">{{ item.label }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'desc-list',
  data() {
    return {
      descData: [
        { label: '好友', count: 0 },
        { label: '关注', count: 0 },
        { label: '粉丝', count: 0 },
        { label: '获赞', count: 0 },
      ]
    }
  },
  created() {},
  mounted() {},
}
</script>

<style lang="less" scoped>
.desc-list {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  .desc-cell {
    flex: 1;
    text-align: center;
    padding: 20px 0;
    &-value {
      font-size: 18px;
      font-weight: 500;
      line-height: 1;
    }
    &-title {
      padding-top: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
