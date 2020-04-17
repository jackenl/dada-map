<template>
  <div id="app">
    <router-view />
    <Navbar />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {
    Navbar,
  },
}
</script>

<style lang="less">
</style>
