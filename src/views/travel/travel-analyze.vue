<template>
  <div class="analysis">
    <div class="analysis-title">
      <h2>数据分析</h2>
      <p>针对出行里程，行程类别，出行方式绘制的几种数据分析图</p>
    </div>
    <!-- <gaugeChart class="echart0"></gaugeChart> -->
    <pieChart class="echart1" ref="echart1"></pieChart>
    <barsChart class="echart0"></barsChart>
    <barChart class="echart2" ref="echart2"></barChart>
  </div>
</template>

<script>
import barChart from './components/echart'
import pieChart from './components/pieChart'
import barsChart from './components/barsChart'

export default {
  name: 'travel-analyze',
  components: {
    barChart,
    pieChart,
    barsChart
  },
  mounted() {
    let tmpDistance = Object.assign({}, 247)
    delete tmpDistance.userId
    this.$nextTick(() => {
      this.$refs.echart1.echartsUpdata(tmpDistance)
    })
    this.$nextTick(() => {
      this.$refs.echart2.initChart(
        Object.values(tmpDistance),
        '出行总里程图'
      )
    })
  },
}
</script>

<style lang="less" scoped>
.analysis {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 30px;
  box-sizing: border-box;
  &-title {
    h2 {
      font-size: 40px;
      text-align: center;
    }
    p {
      color: #2f86f6;
      font-size: 25px;
      margin-top: 15px;
      text-align: center;
    }
  }
}
.echart0{
    margin-top: 50px;
}
.echart1{
    margin-top: 50px;
}
.echart2{
    margin-top: 50px;
}
</style>
