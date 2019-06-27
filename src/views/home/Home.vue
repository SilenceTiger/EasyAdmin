<template>
  <div class="container">
    <!-- <h1>视图切换区域</h1> -->
    <div class="tree-container">
      <Tree :data="treeData"></Tree>
    </div>
    <div class="list-container">
      <div class="query-wrap">
        <div class="row">
          <div class="form-label">
            <label>名称</label>
          </div>
          <div class="form-component">
            <Input class="width-100" v-model="value" placeholder="Enter something..."/>
          </div>
          <div class="form-label">
            <label>城市</label>
          </div>
          <div class="form-component">
            <Input class="width-100" v-model="value" placeholder="Enter something..."/>
          </div>
        </div>
        <div class="query-btn-wrap">
          <Button type="primary">查询</Button>
          <Button class="mgl-20">清空</Button>
        </div>
      </div>
      <div class="table-wrap">
        <Table border :columns="columns7" :data="data6"></Table>
        <div class="pagination">
          <Page :total="100" show-elevator/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchTree } from "@/api/home";
export default {
  name: "home",
  created() {
    fetchTree().then(response => {
      this.treeData = response;
    });
  },
  data() {
    return {
      value: "",
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
    background: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  .list-container {
    margin-left: 230px;
    height: 100%;
    .query-wrap {
      height: 64px;
      background: #fff;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      position: relative;
      padding-right: 200px;
      .query-btn-wrap {
        position: absolute;
        right: 10px;
        bottom: 15px;
      }
    }
    .table-wrap {
      margin-top: 10px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      .pagination {
        height: 40px;
        background: #fff;
        padding:3px 10px 0 0;
        text-align: right;
      }
    }
  }
}
</style>
