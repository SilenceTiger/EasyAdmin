<template>
  <div class="container">
    <div id="map-container"></div>
  </div>
</template>

<script>

export default {
  name: "BaseMap",
  data() {
    return {
     
    };
  },
  mounted() {
     var map = new AMap.Map('map-container', {
        zoom:11,//级别
        center: [116.397428, 39.90923],//中心点坐标
        viewMode:'3D'//使用3D视图
    });
  }
};
</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    #map-container {
      height: 100%;
    }
  }
</style>

