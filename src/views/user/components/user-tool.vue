<template>
  <div class="user-tool">
    <div class="user-tool-title">{{ title }}</div>
    <div v-for="(toolbar, index1) in newTools" :key="index1" class="user-tool-bar">
      <div v-for="(tool, index2) in toolbar" :key="index2" class="user-tool-cell" @click="onShow(tool.path)">
        <svg-icon class="img-svg" :icon-class="tool.icon"/>
        <p>{{ tool.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    toolList: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      newTools: {}
    }
  },
  watch: {
    toolList: {
      handler: 'getNewTools',
      immediate: true
    }
  },
  methods: {
    getNewTools(newVal) {
      let i = 0
      this.newTools[i.toString()] = []
      newVal.forEach((item, index) => {
        this.newTools[i].push(item)
        if ((index + 1) % 4 === 0) {
          i++
          this.newTools[i.toString()] = []
        }
      })
    },
    onShow(path) {
      if (path) {
        this.$router.push(path)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-tool {
  background: #fff;
  margin: 20px 20px 0;
  padding: 30px;
  border-radius: 20px;
  color: #333;
  &-title {
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    padding-bottom: 30px;
    border-bottom: 1px solid #eee;
  }
  &-bar {
    display: flex;
  }
  &-cell {
    text-align: center;
    width: 25%;
    margin-top: 30px;
    & > p {
      padding-top: 10px;
      font-size: 12px;
    }
  }
}
</style>
