<template>
  <div class="layout">
    <div class="menu-container">
      <div class="app-logo"></div>
      <SideMenu/>
    </div>
    <div class="main-container">
      <div class="head-wrap" id="head-wrap"></div>
      <div class="view-wrap">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import SideMenu from "@/components/SideMenu";
export default {
  name: "MainLayout",
  components: {
    SideMenu
  },
  mounted() {
    //just for fun
    let width = document.getElementById("head-wrap").clientWidth;
    let height = document.getElementById("head-wrap").clientHeight;

    let i = 0;
    let svg = d3
      .select("#head-wrap")
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    svg
      .append("rect")
      .attr("width", width)
      .attr("height", height)
      .attr("fill", "rgba(0,0,0,0)")
      .on("ontouchstart" in document ? "touchmove" : "mousemove", particle);
    function particle() {
      let m = d3.mouse(this);
      svg
        .insert("circle", "rect")
        .attr("cx", m[0])
        .attr("cy", m[1])
        .attr("r", 1e-6)
        .attr("fill", "rgba(0,0,0,0)")
        .attr("stroke-width", 1.5)
        .style("stroke", d3.hsl((i = (i + 1) % 360), 1, 0.5))
        .style("stroke-opacity", 1)
        .transition()
        .duration(2000)
        .ease(Math.sqrt)
        .attr("r", 100)
        .style("stroke-opacity", 1e-6)
        .remove();
      d3.event.preventDefault();
    }
  }
};
</script>

<style lang="less" scoped>
.layout {
  height: 100%;
  .menu-container {
    float: left;
    width: 240px;
    height: 100%;
    padding: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    overflow-y: auto;
    overflow-x: hidden;
    .app-logo {
      background: url(../imgs/common/dota2.png) no-repeat center;
      background-size: cover;
      height: 60px;
      width: 60px;
      margin: 10px auto;
    }
  }
  .main-container {
    margin-left: 240px;
    height: 100%;
    .head-wrap {
      height: 80px;
      background: #333;
    }
    .view-wrap {
      height: calc(100% - 80px);
      padding: 10px;
      background: #fbfdfb;
    }
  }
}
</style>

