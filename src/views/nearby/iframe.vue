<template>
  <div class="search">
    <iframe class="iframe" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: 'iframe',
  data() {
    return {
      url: ''
    }
  },
  created() {
    this.url = this.$route.query.url || ''
  },
}
</script>

<style lang="less" scoped>
.search {
  height: 100%;
  .iframe {
    height: 100%;
    width: 100%;
  }
}
</style>
