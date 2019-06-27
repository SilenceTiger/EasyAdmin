<template>
  <div class="container">
    <h1>props</h1>
    <Button type="primary" @click="changeObj">修改obj</Button>
    <PropsChild name="silencetiger" :obj="obj" @clickEvent="handleEvent">
      <h1>slot</h1>
    </PropsChild>
  </div>
</template>

<script>
import PropsChild from "./children/PropsChild";
export default {
  name: "PropsWay",
  components: {
    PropsChild
  },
  data() {
    return {
      obj: {
        msg: "123"
      }
    };
  },
  methods: {
    changeObj() {
      this.obj.msg = "456";
    },
    handleEvent(e) {
       this.obj.msg = "123";
    }
  }
};
</script>

<style lang="less" scoped>
</style>

