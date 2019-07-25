<template>
  <Form :model="formItem" :label-width="120">
    <FormItem label="k">
      <Input v-model="formItem.k" placeholder="#000000" />
    </FormItem>

    <FormItem label="cluster dimensions">
      <CheckboxGroup v-model="formItem.clusterDimensions">
        <Checkbox  v-for="item in dimensionsList" :label="item.en" :key="item.en">
          <span>{{item.cn}}</span>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>

    <div class="btn-container">
      <Button type="primary" @click="submit">Submit</Button>
      <Button style="margin-left: 8px" @click="cancel">Cancel</Button>
    </div>
  </Form>
</template>

<script>
import { PROPS_MAP } from "./houseData.js";
export default {
  name: "ClusterSetting",
  mounted() {
    this.formItem = this.clusterSettingObj
  },
  props: {
    clusterSettingObj: {
      type: Object
    }
  },
  data() {
    return {
      formItem: {},
      dimensionsList: PROPS_MAP
    };
  },
  methods: {
    cancel(e) {
      this.$emit("cancel-event")
    },
    submit(e) {
      this.$emit("submit-event", this.formItem)
    }
  },
};
</script>

<style lang="less" scoped>
.btn-container {
  text-align: center;
}
</style>

