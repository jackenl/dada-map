<template>
  <van-tabbar v-if="visible" :value="active" route>
    <van-tabbar-item
      v-for="(item, index) in data"
      :key="`${index}-${item.path}`"
      replace
      :to="item.path"
      :icon="item.icon"
    >{{ item.label }}</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'

export default {
  name: 'navbar',
  components: {
    'van-tabbar': Tabbar,
    'van-tabbar-item': TabbarItem,
  },
  data() {
    return {
      data: [
        { label: '出行', path: '/travel', icon: 'home-o' },
        { label: '路线', path: '/traffic', icon: 'home-o' },
        { label: '附近', path: '/nearby', icon: 'home-o' },
        { label: '我的', path: '/user', icon: 'home-o' },
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
