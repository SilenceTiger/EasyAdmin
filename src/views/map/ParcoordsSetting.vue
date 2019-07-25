<template>
  <Form :model="formItem" :label-width="100">
    <FormItem label="brushMode">
      <Select v-model="formItem.brushMode">
        <Option v-for="item in brushModeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </FormItem>

    <FormItem label="brushedColor">
      <Input v-model="formItem.brushedColor" placeholder="#000000" />
    </FormItem>

    <FormItem label="dimensionsShow">
      <CheckboxGroup v-model="formItem.dimensionsShow">
        <Checkbox  v-for="item in dimensionsList" :label="item.en" :key="item.en">
          <span>{{item.cn}}</span>
        </Checkbox>
      </CheckboxGroup>
    </FormItem>

    <FormItem label="useCurve">
      <i-switch v-model="formItem.useCurve" size="large">
        <span slot="open">On</span>
        <span slot="close">Off</span>
      </i-switch>
    </FormItem>

    <FormItem label="reorderable">
      <i-switch v-model="formItem.reorderable" size="large">
        <span slot="open">On</span>
        <span slot="close">Off</span>
      </i-switch>
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
  name: "ParcoordsSetting",
  mounted() {
    this.formItem = this.parcoordsSettingObj
  },
  props: {
    parcoordsSettingObj: {
      type: Object
    }
  },
  data() {
    return {
      formItem: {},
      brushModeList: [
        {
          value: "1D-axes",
          label: "1D-axes"
        },
        {
          value: "1D-axes-multi",
          label: "1D-axes-multi"
        },
        {
          value: "2D-strums",
          label: "2D-strums"
        },
        {
          value: "angular",
          label: "angular"
        }
      ],
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

