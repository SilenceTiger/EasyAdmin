<template>
   <div class="chart-container">
    <div class="chart-wrap" id="bar-chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "BaseChart",
  data() {
    return {};
  },
  mounted() {
    var myChart = echarts.init(document.getElementById("bar-chart"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "ECharts 入门示例"
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }
};
</script>

<style lang="less" scoped>
.chart-container {
  height: 100%;
  .chart-wrap {
    width: 33.33%;
    height: 350px;
    padding: 10px;
    background: #fff;
    float: left;
  }
}
</style>

