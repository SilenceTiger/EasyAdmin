<template>
  <div class="chart-container">
    <div class="chart-wrap" id="gl-chart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts-gl";

const glData = require("@/data/glData.json");
//["Income", "Life Expectancy", "Population", "Country", "Year"]
//[人均收入，人均寿命，人口数量，国家和年份]
export default {
  name: "GlChart",
  mounted() {
    let myChart = echarts.init(document.getElementById("gl-chart"));
    myChart.setOption({
      grid3D: {},
      xAxis3D: {},
      yAxis3D: {},
      zAxis3D: {},
      dataset: {
        source: glData
      },
      series: [
        {
          type: "scatter3D",
          symbolSize: 2.5
        }
      ]
    });
  },
  data() {
    return {};
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

