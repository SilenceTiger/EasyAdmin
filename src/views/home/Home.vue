<template>
  <div class="container">
    <h1>视图切换区域</h1>
    <!-- <div class="tree-container">
      <Tree :data="treeData"></Tree>
    </div>
    <div class="list-container">
      <div class="query-wrap"></div>
      <div class="table-wrap">
        <Table border :columns="columns7" :data="data6"></Table>
      </div>
    </div> -->
  </div>
</template>

<script>
//import { fetchTree } from "@/api/home";
export default {
  name: "home",
  created() {
    // fetchTree().then(response => {
    //   this.treeData = response;
    // });
  },
  data() {
    return {
      treeData: [],
      columns7: [
        {
          title: "Name",
          key: "name",
          render: (h, params) => {
            return h("div", [
              h("Icon", {
                props: {
                  type: "person"
                }
              }),
              h("strong", params.row.name)
            ]);
          }
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Action",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.show(params.index);
                    }
                  }
                },
                "View"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params.index);
                    }
                  }
                },
                "Delete"
              )
            ]);
          }
        }
      ],
      data6: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park"
        }
      ]
    };
  },
  methods: {
    show(index) {
      this.$Modal.info({
        title: "User Info",
        content: `Name：${this.data6[index].name}<br>Age：${
          this.data6[index].age
        }<br>Address：${this.data6[index].address}`
      });
    },
    remove(index) {
      this.data6.splice(index, 1);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  .tree-container {
    float: left;
    width: 220px;
    height: 100%;
    padding: 5px 10px;
  }
  .list-container {
    margin-left: 220px;
    height: 100%;
    .query-wrap {
      min-height: 80px;
      background: #eee;
    }
    .table-wrap {
      min-height: 400px;
    }
  }
}
</style>
