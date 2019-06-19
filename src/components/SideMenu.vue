<template>
  <div>
    <Menu>
      <!-- 这里需要使用一个递归组件，要不然只能按照层数来写，递归组件可以支持n级 -->
      <SideMenuItem  v-for="item in menuList" :key="item.name" :item="item" />
    </Menu>
  </div>
</template>

<script>
import { routesData } from "@/router";
import SideMenuItem from "@/components/SideMenuItem";

export default {
  name: "SideMenu",
  components: {
    SideMenuItem
  },
  data() {
    return {
      menuList: routesData
    };
  }
};
</script>

