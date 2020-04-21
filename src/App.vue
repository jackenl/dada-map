<template>
  <div id="app">
    <div class="view">
      <router-view />
    </div>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar/index'

export default {
  name: 'App',
  components: {
    Tabbar,
  },
}
</script>

<style lang="less">
@import './assets/style/var.less';
#app {
  height: 100%;
  overflow: hidden;
  & .view {
    height: 100%;
    overflow: auto;
  }
}
</style>
