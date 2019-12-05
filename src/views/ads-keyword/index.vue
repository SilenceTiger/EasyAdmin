<template>
  <div class="container">
    <Row class="height-40">
      <Col span="8">
        <label class="text">Env:</label>
        <Input v-model="env" placeholder="env" style="width: calc(100% - 100px)"
      /></Col>
      <Col span="8">
        <label class="text">Domain:</label>
        <Input
          v-model="domain"
          placeholder="domain"
          style="width: calc(100% - 100px)"
      /></Col>
      <Col span="8">
        <Button class="ads-btn" type="primary" @click="calculate"
          >Calculate</Button
        >
        <Button class="ads-btn" @click="show">Show</Button></Col
      >
    </Row>

    <div class="graph-container" id="graph-chart"></div>

    <div class="graph-container" id="rose-chart"></div>

    <Modal
      v-model="relationVisible"
      :title="relationTitle"
      ok-text="Submit"
      cancel-text="Cancel"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="rank" v-for="(rank, index) in hotRank" :key="rank.id">
        <span class="hot" :class="'hot' + index">{{ index + 1 }}</span>
        <span class="search-value" :title="rank.search_value">{{
          rank.search_value
        }}</span>
        <span class="search-times">{{ rank.search_time }}</span>
      </div>
    </Modal>

    <Modal
      v-model="roseVisible"
      :title="roseTitle"
      ok-text="Submit"
      cancel-text="Cancel"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div class="label">Template:</div>
      <div v-for="temp in templates" :key="temp.id">
        {{ temp.id }}
        <input class="input" type="text" v-model="temp.name" />
      </div>

      <div class="label">Link:</div>
      <Input
        v-model="landingPageLink"
        type="textarea"
        :autosize="autoSize"
        placeholder=""
        style="width: 100%"
      />
    </Modal>
  </div>
</template>

<script>
import http from "../../utils/http";
import echarts from "echarts";

export default {
  name: "home",
  mounted() {
    this.relationChart = echarts.init(document.getElementById("graph-chart"));
    this.roseChart = echarts.init(document.getElementById("rose-chart"));
  },
  data() {
    return {
      env: "test",
      domain: "site1.chime.me",
      relationChart: null,
      relationVisible: false,
      roseChart: null,
      roseVisible: false,
      templates: [],
      landingPageLink: "",
      autoSize: {
        minRows: 2,
        maxRows: 6
      },
      hotRank: [],
      relationTitle: "Hot Word Rank",
      roseTitle: "Detail"
    };
  },
  methods: {
    calculate() {
      http({
        method: "get",
        url: "/adsKeyword/calculate",
        params: {
          env: this.env,
          domain: this.domain
        }
      }).then(data => {
        alert(data)
      });
    },
    show() {
      let that = this;
      http({
        method: "get",
        url: "/adsKeyword/list",
        params: {
          env: this.env,
          domain: this.domain
        }
      }).then(responseData => {
        let categorySet = new Set();
        responseData.nodes.forEach(function(item) {
          categorySet.add(item.category);
        });
        let categories = Array.from(categorySet);
        responseData.nodes.forEach(function(item) {
          let originalCat = item.category;
          item.category = categories.indexOf(originalCat);
          item.symbolSize = Math.sqrt(item.symbolSize);
        });

        let categoryTemp = [];
        categories.forEach(function(item) {
          categoryTemp.push({ name: item });
        });
        categories = categoryTemp;

        let relationChartOption = {
          title: {
            text: "Ads Hot Type",
            top: "top",
            left: "left"
          },
          left: "left",
          tooltip: {},
          grid: {
            left: 20
          },
          legend: {
            data: categories.map(function(a) {
              return a.name;
            }),
            width: "300px",
            x: "right",
            y: "30"
          },
          animationDurationUpdate: 1500,
          animationEasingUpdate: "quinticInOut",
          series: [
            {
              name: "Ads hot Word",
              type: "graph",
              layout: "circular",
              circular: {
                rotateLabel: true
              },
              x: "left",
              data: responseData.nodes,
              links: responseData.links,
              categories: categories,
              roam: true,
              label: {
                normal: {
                  position: "right",
                  formatter: "{b}"
                }
              },
              lineStyle: {
                normal: {
                  color: "source",
                  curveness: 0.3
                }
              }
            }
          ]
        };
        this.relationChart.setOption(relationChartOption);
        this.relationChart.on("click", function(params, env, domain) {
          let searchType = params.data.name;
          that.relationTitle = "Hot Word Rank" + "(" + searchType + ")";
          that.relationVisible = true;
          http({
            method: "get",
            url: "/adsKeyword/keywordTime",
            params: {
              env: that.env,
              domain: that.domain,
              searchType: searchType
            }
          }).then(data => {
            that.hotRank = data;
          });
        });

        let roseOption = {
          title: {
            text: "Ads Hot Word",
            x: "left"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          calculable: true,
          series: [
            {
              name: "Radius Mode",
              type: "pie",
              radius: [20, 150],
              center: ["25%", "250"],
              roseType: "radius",
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: responseData.words
            },
            {
              name: "Area Mode",
              type: "pie",
              radius: [30, 150],
              center: ["75%", "250"],
              roseType: "area",
              label: {
                formatter: function(value) {
                  let _name = value.data.name;
                  if (_name.length > 15) {
                    return _name.substring(0, 15) + "...";
                  } else {
                    return _name;
                  }
                }
              },
              data: responseData.words
            }
          ]
        };
        this.roseChart.setOption(roseOption);
        this.roseChart.on("click", function(params, env, domain) {
          let id = params.data.id;
          that.roseVisible = true;
          http({
            method: "get",
            url: "/adsKeyword/keyword/info",
            params: {
              env: that.env,
              domain: that.domain,
              keyWordIds: id
            }
          }).then(data => {
            that.templates = data[0].ads_template;
            that.roseTitle = "Detail(" + data[0].search_type + ")";
            let temp = [];
            data[0].ads_template.forEach((item, index) => {
              temp.push({
                id: index + 1 + ".",
                name: item
              });
            });
            that.templates = temp;
            that.landingPageLink = data[0].landing_page_link;
          });
        });
      });
    },
    ok() {},
    cancel() {
      this.relationVisible = false;
      this.roseVisible = false;
    }
  }
};
</script>

<style lang="less">
.container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  .height-40 {
    height: 40px;
  }
  .text {
    line-height: 33px;
    text-align: right;
    display: inline-block;
    padding-right: 10px;
  }
  .ads-btn {
    margin-left: 20px;
  }
  .graph-container {
    width: 100%;
    height: 600px;
  }
}
.input {
  border: none;
  outline: none;
  width: calc(100% - 15px);
}
.label {
  font-size: 14px;
  font-weight: bold;
  line-height: 25px;
}
.ivu-modal-footer {
  .ivu-btn-primary {
    display: none;
  }
}
.rank {
  height: 30px;
}
.hot {
  width: 19px;
  height: 19px;
  background: #0b64ac;
  color: #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  display: block;
  float: left;
  margin-right: 5px;
  margin-top: -1px;
  &.hot0 {
    background: #ff5959;
  }
  &.hot1 {
    background: #ff7200;
  }
  &.hot2 {
    background: #ffae00;
  }
}
.search-value {
  max-width: 400px;
  overflow: hidden;
  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-times {
  float: right;
  color: #999;
}
</style>
