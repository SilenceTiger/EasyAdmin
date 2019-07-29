<template>
  <div class="container">
    <div class="operate-wrap">
      <Button class="margin-right-10" @click="parcoordsSetting">平行坐标配置</Button>
      <Button class="margin-right-10" @click="clusterSetting">聚类配置</Button>
      <Button @click="reset">重置</Button>
    </div>

    <div class="split-pane-page-wrapper">
      <split-pane v-model="offset" @on-moving="handleMoving">
        <div slot="left" class="pane left-pane">
          <split-pane v-model="offsetVertical" mode="vertical" @on-moving="handleMoving">
            <div slot="top" class="pane top-pane">
              <div id="parcoords" class="parcoords"></div>
            </div>
            <div slot="bottom" class="pane bottom-pane">
              <Table
                highlight-row
                @on-current-change="tableRowClick"
                :height="tableHeight"
                border
                :columns="tableHead"
                :data="tableBody"
              ></Table>
            </div>
            <div slot="trigger" class="custom-trigger"></div>
          </split-pane>
        </div>

        <div slot="right" class="pane right-pane">
          <div id="map-container"></div>
        </div>
      </split-pane>
    </div>

    <Modal v-model="showParcoordsSetting" draggable footer-hide title="平行坐标配置">
      <ParcoordsSetting
        :parcoordsSettingObj="parcoordsSettingObj"
        @submit-event="parcoordsSettingSubmit"
        @cancel-event="parcoordsSettingCancel"
      />
    </Modal>

    <Modal v-model="showClusterSetting" draggable footer-hide title="聚类配置">
      <ClusterSetting
        :clusterSettingObj="clusterSettingObj"
        @submit-event="clusterSettingSubmit"
        @cancel-event="clusterSettingCancel"
      />
    </Modal>
  </div>
</template>
<script>
//consider
//1.房产实体信息录入子系统
//2.专家评分子系统
//3.可视分析子系统（便于用户找房、分析房）
import * as d3 from "d3";
import ParCoords from "parcoord-es";
import SplitPane from "@/components/split-pane";
import {
  COMPANY_LOCATION,
  DIMENSION_MAP,
  PROPS_MAP,
  HOUSE_DATA
} from "./houseData.js";
import KMeans from "@/libs/kmeans";
import { setTimeout } from "timers";

import ParcoordsSetting from "./ParcoordsSetting";
import ClusterSetting from "./ClusterSetting";

const mockMarkers = [
  {
    name: "光谷同济医院",
    lng: 114.466432,
    lat: 30.485292
  },
  {
    name: "武汉正蒙北辰幼儿园",
    lng: 114.486475,
    lat: 30.473889
  },
  {
    name: "光谷生物园地铁站",
    lng: 114.481326,
    lat: 30.48706
  }
];

const colors = ["red", "black", "yellow", "green", "blue", "pink"];

let parcoords, map;

export default {
  name: "BaseMap",
  components: {
    SplitPane,
    ParcoordsSetting,
    ClusterSetting
  },
  data() {
    return {
      //layout
      offset: 0.7,
      offsetVertical: "300px",
      //parallel coordinate
      parcoordsSettingObj: {
        brushMode: "1D-axes",
        brushedColor: "#EA0000",
        dimensionsShow: [
          "unitPrice",
          "area",
          "totalPrice",
          "propertyFee",
          "bedroomNum",
          "medicalScore",
          "educationScore",
          "businessScore",
          "trafficScore",
          "propertyScore"
        ],
        useCurve: true,
        reorderable: true
      },
      clusterSettingObj: {
        k: 3,
        clusterDimensions: []
      },
      //modal
      showParcoordsSetting: false,
      showClusterSetting: false,
      //table
      tableHeight: 400,
      tableHead: [],
      tableBody: []
    };
  },

  methods: {
    renderMap() {
      map = new AMap.Map("map-container", {
        zoom: 12, //级别
        center: COMPANY_LOCATION, //中心点坐标
        pitch: 60, // 地图俯仰角度，有效范围 0 度- 83 度
        viewMode: "3D" // 地图模式
      });
      //加载地图插件
      AMap.plugin(
        [
          "AMap.ToolBar",
          "AMap.Scale",
          "AMap.OverView",
          "AMap.MapType",
          "AMap.Geolocation"
        ],
        function() {
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          map.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          map.addControl(new AMap.OverView({ isOpen: true }));

          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          map.addControl(new AMap.MapType());

          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          map.addControl(new AMap.Geolocation());
        }
      );

      //marker location
      let markList = [];
      HOUSE_DATA.forEach(item => {
        let markerTemp = new AMap.Marker({
          position: new AMap.LngLat(item.lng, item.lat),
          title: item.name
        });
        //event
        markerTemp.on("click", function(e) {
          console.log(e);
          mockMarkers.forEach(obj => {
            map.add(
              new AMap.Marker({
                position: new AMap.LngLat(obj.lng, obj.lat),
                title: obj.name,
                icon: "building.png" // Icon的图像
              })
            );
          });
        });
        markerTemp.on("mouseover", function(e) {
          // console.log("111");
        });
        markerTemp.on("mouseout", function(e) {
          // console.log("222");
        });

        markList.push(markerTemp);
      });

      map.add(markList);
      map.on("click", function(ev) {
        console.log(ev.lnglat);
        // 触发事件的对象
        // var target = ev.target;
        // // 触发事件的地理坐标，AMap.LngLat 类型
        // var lnglat = ev.lnglat;
        // // 触发事件的像素坐标，AMap.Pixel 类型
        // var pixel = ev.pixel;
        // // 触发事件类型
        // var type = ev.type;
      });
    },
    handleMoving(e) {
      //console.log(e.atMin, e.atMax);
    },
    renderParcoords() {
      //$("#parcoords").empty() 等价
      let ele = document.getElementById("parcoords");
      while (ele.hasChildNodes()) {
        ele.removeChild(ele.firstChild);
      }
      parcoords = ParCoords()("#parcoords").alpha(0.4);
      let dimensions = {};
      this.parcoordsSettingObj.dimensionsShow.forEach(item => {
        dimensions[item] = {
          title: DIMENSION_MAP[item]
        };
      });
      parcoords
        .data(HOUSE_DATA)
        .margin({
          top: 30,
          left: 50,
          right: 50,
          bottom: 30
        })
        .dimensions(dimensions)
        .composite("darker")
        .shadows()
        .color(function(d) {
          if (d.belong) {
            return colors[d.belong];
          } else {
            return colors[0];
          }
        })
        .brushMode(this.parcoordsSettingObj.brushMode)
        .brushedColor(this.parcoordsSettingObj.brushedColor)
        .render();

      if (this.parcoordsSettingObj.reorderable) {
        parcoords.reorderable();
      }
      if (this.parcoordsSettingObj.useCurve) {
        parcoords.smoothness(0.2);
      }
      parcoords.brushReset();
      this.setScale();
      this.bindParcoordsEvent();
    },
    setScale() {
      //每一个轴的范围从 0.9 * min ~ 1.1 * max
      this.parcoordsSettingObj.dimensionsShow.forEach(item => {
        let min = d3.min(HOUSE_DATA, function(d) {
          return d[item];
        });
        let max = d3.max(HOUSE_DATA, function(d) {
          return d[item];
        });
        if (item.indexOf("Score") > -1) {
          parcoords.scale(item, [0, 10]);
        } else {
          if (!isNaN(max)) {
            parcoords.scale(item, [0.9 * min, 1.1 * max]);
          }
        }
      });
    },
    bindParcoordsEvent() {
      var _this = this;
      parcoords.on("brush", function(data) {
        // console.log(data);
        _this.tableBody = data;
        //处理地图上的marker
        map.clearMap();
        let markList = [];
        data.forEach(item => {
          let markerTemp = new AMap.Marker({
            position: new AMap.LngLat(item.lng, item.lat),
            title: item.name
          });
          //event
          markerTemp.on("click", function(e) {
            console.log(e);
            mockMarkers.forEach(obj => {
              map.add(
                new AMap.Marker({
                  position: new AMap.LngLat(obj.lng, obj.lat),
                  title: obj.name,
                  icon: "building.png" // Icon的图像
                })
              );
            });
            //光谷同济医院  lng: 114.466432, lat: 30.485292
            //武汉正蒙北辰幼儿园 lng: 114.486475, lat: 30.473889
            //光谷生物园地铁站 lng: 114.481326, lat: 30.48706
          });
          markerTemp.on("mouseover", function(e) {
            // console.log("111");
          });
          markerTemp.on("mouseout", function(e) {
            // console.log("222");
          });

          markList.push(markerTemp);
        });

        map.add(markList);
      });

      parcoords.on("highlight", function(data) {
        //console.log(data)
      });
    },

    renderTable() {
      let _tableHead = [];
      let _tableBody = [];
      PROPS_MAP.forEach(item => {
        let temp = {
          title: item.cn,
          key: item.en,
          width: 120,
          sortable: true,
          align: "center"
        };
        if (item.en == "name") {
          temp.fixed = "left";
        }
        _tableHead.push(temp);
      });
      _tableHead.push({
        title: "所属维度",
        key: "belong",
        width: 120,
        // fixed: "right",
        sortable: true,
        align: "center"
      });
      _tableHead.push({
        title: "操作",
        key: "action",
        align: "center",
        fixed: "right",
        width: 80,
        render: (h, params) => {
          return h("div", [
            h(
              "Button",
              {
                props: {
                  type: "primary",
                  size: "small"
                },
                on: {
                  click: () => {
                    this.located(params);
                  }
                }
              },
              "定位"
            )
          ]);
        }
      });

      HOUSE_DATA.forEach(item => {
        _tableBody.push(item);
      });
      this.tableHead = _tableHead;
      this.tableBody = _tableBody;
    },
    tableRowClick(currentRow, oldCurrentRow) {
      parcoords.highlight([currentRow]);
    },
    located(params) {
      let location = [params.row.lng, params.row.lat];
      //map.setCenter(location); //设置地图中心点
      //map.setZoom(location); //设置级别
      map.setZoomAndCenter(17, location);
    },
    parcoordsSetting() {
      this.showParcoordsSetting = true;
    },

    parcoordsSettingSubmit(params) {
      this.$Message.info("设置成功！");
      this.parcoordsSettingObj = params;
      this.showParcoordsSetting = false;
      this.renderParcoords();
    },

    parcoordsSettingCancel() {
      this.showParcoordsSetting = false;
    },

    clusterSetting() {
      this.showClusterSetting = true;
    },

    clusterSettingSubmit(params) {
      this.showClusterSetting = false;
      this.runKmeans(params.k, params.clusterDimensions);
    },

    runKmeans(k, dimensions) {
      var _this = this;
      //根据dimensions构造数据
      let _data = [];
      HOUSE_DATA.forEach(item => {
        let temp = [];
        dimensions.forEach(obj => {
          temp.push(item[obj]);
        });
        _data.push(temp);
      });
      //console.log(_data)
      //dimensions = ['area', 'price']
      //var data = [[6, 5], [9, 10], [10, 8], [5, 5], [1, 2], [2, 2]];
      let kmeans = KMeans({
        data: _data,
        k: k
      });
      // kmeans.on("iteration", function(self) {});
      //console.log(HOUSE_DATA);
      kmeans.on("end", function(self) {
        //根据self.assignments给颜色
        HOUSE_DATA.forEach((item, index) => {
          item.belong = self.assignments[index];
        });
        _this.tableBody = HOUSE_DATA;
        // console.log(_this.tableBody)
        _this.renderParcoords();
        //_this.$nextTick();
      });
      kmeans.run();
    },

    clusterSettingCancel() {
      this.showClusterSetting = false;
    },

    reset() {
      // parcoords && parcoords.brushReset();
      // parcoords && parcoords.unhighlight();
      HOUSE_DATA.forEach((item, index) => {
        item.belong = '';
      });
      this.renderParcoords();
    }
  },

  mounted() {
    this.renderMap();
    this.renderTable();
    setTimeout(() => {
      this.renderParcoords();
    }, 0);
  }
};
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  #map-container {
    height: 100%;
  }
  .operate-wrap {
    height: 40px;
    padding: 5px 0;
  }
}
.center-middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.margin-right-10 {
  margin-right: 10px;
}

.split-pane-page-wrapper {
  height: calc(100% - 40px);
  .pane {
    width: 100%;
    height: 100%;
    &.right-pane {
      padding-left: 6px;
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
    &.top-pane {
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      .parcoords {
        width: 100%;
        height: 100%;
      }
    }
    &.bottom-pane {
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }
  .custom-trigger {
    width: 20px;
    height: 20px;
    background: url(../../imgs/common/dota2.png) no-repeat center;
    background-size: cover;
    position: absolute;
    cursor: row-resize;
    .center-middle;
    box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
    // i.trigger-icon {
    //   .center-middle;
    // }
  }
}
</style>

