<template>
  <div class="container">
    <h1>props child</h1>
    <h2>{{name}}</h2>
    <h2>{{obj.msg}}</h2>
    <slot></slot>
    <Button type="primary" @click="changeProp">change props test</Button>
    <br />
    <Button @click="fireEvent">自定义事件</Button>
  </div>
</template>

<script>
export default {
  name: "PropsChild",
  props: {
    name: {
      required: true,
      type: String
    },
    obj: {
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {
    changeProp(e) {
      //Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders. Instead, use a data or computed property based on the prop's value. Prop being mutated: "name"
      this.name = 'conglu'
    },
    fireEvent(e) {
      this.$emit("clickEvent", e)
    }
  },
  computed: {
  }
};
</script>

<style lang="less" scoped>
</style>

