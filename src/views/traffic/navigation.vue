<template>
  <div class="navigation">
    <!-- 地图组件 -->
    <Map :plugins="['AMap.Scale']" traffic satellite></Map>
  </div>
</template>

<script>
import Map from '@/components/Map/Map';

export default {
  name: 'navigation',
  components: {
    Map
  },
  data() {
    return {}
  },
  created() {},
  mounted() {},
}
</script>

<style scoped>
</style>
