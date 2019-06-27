<template>
  <div>
    <!-- 通过是否有children判断使用submenu or menuitem -->
    <template v-if="item.children">
      <!-- 只有一个子路由不需要submenu -->
      <template v-if="hasOneChild(item)">
        <MenuItem :key="item.name" :name="item.name" @click.native="switchView(item)">
          <Icon :type="item.meta.icon" v-if="item.meta && item.meta.icon"/>
          {{item.children[0].name}}
        </MenuItem>
      </template>

      <template v-else>
        <Submenu :key="item.name" :name="item.name">
          <template slot="title">
            <Icon :type="item.meta.icon" v-if="item.meta && item.meta.icon"/>
            {{item.name}}
          </template>
          <!-- 递归调用自己 -->
          <SideMenuItem v-for="obj in item.children" :key="obj.name" :item="obj"/>
        </Submenu>
      </template>
    </template>

    <MenuItem v-else :key="item.name" :name="item.name" @click.native="switchView(item)">
      <Icon :type="item.meta.icon" v-if="item.meta && item.meta.icon"/>
      {{item.name}}
    </MenuItem>
  </div>
</template>

<script>
export default {
  name: "SideMenuItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    hasOneChild(item) {
      return item.children && item.children.length == 1;
    },
    switchView(item) {
      let routeName = item.name;
      if(this.hasOneChild(item)) {
        routeName = item.children[0].name;
      }
      this.$router.push({ name: routeName });
    }
  }
};
</script>


