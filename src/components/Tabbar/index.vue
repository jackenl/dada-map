<template>
  <van-tabbar v-if="visible" :value="active" placeholder route>
    <van-tabbar-item
      v-for="(route, index) in routes"
      :key="index"
      replace
      :to="route.path"
      :icon="route.icon"
      :icon-prefix="route.icon === 'navigation' ? 'my-icon' : 'van-icon'"
    >{{ route.label }}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'tabbar',
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
  },
  data() {
    return {
      routes: [
        { label: '出行', path: '/travel', icon: 'wap-home-o' },
        { label: '导航', path: '/traffic', icon: 'navigation' },
        { label: '附近', path: '/nearby', icon: 'location-o' },
        { label: '我的', path: '/user', icon: 'contact' },
      ],
    }
  },
  computed: {
    active() {
      const routes = ['travel', 'traffic', 'nearby', 'user']
      return routes.indexOf(this.$route.name)
    },
    visible() {
      return this.active > -1;
    }
  },
}
</script>

<style scoped></style>
