<template>
  <div class="travel-trend">
    <div class="travel-trend-title">
      <h2>出行趋势</h2>
      <p>最近七天内，2种行程，8种出行方式的里程趋势折线图</p>
    </div>
    <lineChart ref="echart1" class="trend-echart"></lineChart>
    <lineChart ref="echart2" class="trend-echart-btm"></lineChart>
  </div>
</template>

<script>
import LineChart from './components/lineChart'

export default {
  name: 'travel-trend',
  components: {
    LineChart,
  },
  data() {
    return {
      chart: null,
      xAxisData: ['31日', '1日', '2日', '3日', '4日', '5日', '6日'],
      trafficData: null,
      tripData: null,
      data1: {
        title: '交通出行',
        legendData: ['公交地铁', '驾车', '骑行', '步行'],
        seriesData: [
          {
            name: '公交地铁',
            type: 'line',
            stack: '里程',
            data: [20, 132, 101, 134, 90, 330, 210],
          },
          {
            name: '驾车',
            type: 'line',
            stack: '里程',
            data: [150, 232, 201, 454, 190, 330, 410],
          },
          {
            name: '骑行',
            type: 'line',
            stack: '里程',
            data: [90, 122, 151, 124, 200, 210, 190],
          },
          {
            name: '步行',
            type: 'line',
            stack: '里程',
            data: [189, 102, 230, 410, 287, 180, 200],
          },
        ],
      },
      data2: {
        title: '运动出行',
        legendData: ['健走', '跑步', '骑行'],
        seriesData: [
          {
            name: '健走',
            type: 'line',
            stack: '里程',
            data: [90, 132, 101, 134, 90, 230, 210],
          },
          {
            name: '跑步',
            type: 'line',
            stack: '里程',
            data: [150, 292, 201, 154, 190, 330, 410],
          },
          {
            name: '骑行',
            type: 'line',
            stack: '里程',
            data: [90, 122, 151, 84, 80, 210, 190],
          },
        ],
      },
      sportData: {},
      travelData: {},
    }
  },
  mounted() {
    this.$toast('数据分析中')
    this.fetchData()
  },
  methods: {
    // 重新封装数据，对接echart、
    updatefetchData() {
      let day = new Date().getDate()
      let tmpItem = {}
      // 出行工具为key的拆分
      this.allData.forEach((item) => {
        item.date = parseInt(item.date.slice(8, 10)) + 1
        item.tripType = item.tripType.slice(0, 2)
        if (!tmpItem[item.tripType]) {
          tmpItem[item.tripType] = {
            name: item.tripType,
            type: 'line',
            stack: '里程',
            data: {},
          }
          tmpItem[item.tripType].data[day] = 0
          tmpItem[item.tripType].data[day - 1] = 0
          tmpItem[item.tripType].data[day - 2] = 0
          tmpItem[item.tripType].data[day - 3] = 0
          tmpItem[item.tripType].data[day - 4] = 0
          tmpItem[item.tripType].data[day - 5] = 0
          tmpItem[item.tripType].data[day - 6] = 0
          tmpItem[item.tripType].data[item.date] = item.distance
        } else {
          let tmp = tmpItem[item.tripType].data[item.date]
          if (tmp) {
            tmpItem[item.tripType].data[item.date] = parseInt(tmp) + parseInt(item.distance)
          } else {
            tmpItem[item.tripType].data[item.date] = item.distance
          }
        }
      })
    },
    // 请求最近一周的数据
    fetchData() {
      this.$refs.echart1.echartsUpdata(this.data1, this.xAxisData)
      this.$refs.echart2.echartsUpdata(this.data2, this.xAxisData)
    },
  },
}
</script>

<style lang="less" scoped>
.travel-trend {
  width: 100%;
  height: 100%;
  padding: 30px 30px;
  box-sizing: border-box;
  &-title {
    h2 {
      font-size: 20px;
      text-align: center;
    }
    p {
      color: #2f86f6;
      margin-top: 15px;
      text-align: center;
    }
  }
  .trend-echart {
    margin-top: 30px;
  }
  .trend-echart-btm {
    margin-top: 70px;
  }
}
</style>
