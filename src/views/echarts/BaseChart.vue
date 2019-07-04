<template>
  <div class="chart-container">
    <div class="chart-wrap" id="bar-chart"></div>
    <div class="chart-wrap" id="pie-chart"></div>
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
    var that = this;
    var barChart = echarts.init(document.getElementById("bar-chart"));
    // 绘制图表
    barChart.setOption({
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

    var pieChart = echarts.init(document.getElementById("pie-chart"));
    // 绘制图表
    pieChart.setOption({
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center"
      },
      // tooltip: {
      //   trigger: "item",
      //   formatter: "{a} <br/>{b} : {c} ({d}%)"
      // },
      // legend: {
      //   orient: "vertical",
      //   left: "left",
      //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"]
      // },
      label: {
        formatter: function(val) {
          // console.log(val);
          return val.name + ":" + val.percent + " %" + "\n" + "xxxxx"
        }
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" }
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        }
      ]
    });

    pieChart.on("click", function(params) {
      // 控制台打印数据的名称
      that.pieChartClickEvent(params);
    });
  },

  methods: {
    pieChartClickEvent(params) {
      console.log(params);
    }
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

