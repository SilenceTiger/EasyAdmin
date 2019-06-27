<template>
  <div class="container">
    <div id="example" class="parcoords" style="width:500px;height:150px"></div>
  </div>
</template>
<script>
import ParCoords from "parcoord-es";

export default {
  name: "pcIntroduce",
  mounted() {
    var parcoords = ParCoords()("#example")
      .data([
        [0, -0, 0, 0, 0, 1],
        [1, -1, 1, 2, 1, 1],
        [2, -2, 4, 4, 0.5, 1],
        [3, -3, 9, 6, 0.33, 1],
        [4, -4, 16, 8, 0.25, 1]
      ])
      .render()
      .createAxes();
    console.log(parcoords)
  },
  data() {
    return {};
  }
};
</script>
