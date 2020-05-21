<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20">
        <div class="label-wrap">
          <label for>关键字：</label>
          <div class="wrap-content">
            <el-row :gutter="20">
              <el-col :span="3">
                <SelectEle :config="configOptions" />
              </el-col>
              <el-col :span="4">
                <el-input placeholder="请输入搜索的关键字"></el-input>
              </el-col>
              <el-col :span="16">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="dialog_add_user = true">添加用户</el-button>
      </el-col>
    </el-row>
    <el-row>
      <tableCmpt :config="configTable" :tableRowData.sync="tableRowData" ref="userTable">
        <template v-slot:status="slotData">
          <el-switch
            v-model="slotData.data.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
          ></el-switch>
        </template>
        <template v-slot:operation="slotData">
          <el-button size="mini" type="danger" @click="deleteUser(slotData.data)">删除</el-button>
          <el-button size="mini" type="success" @click="editUser(slotData.data)">编辑</el-button>
        </template>
        <template v-slot:batchDelBtn>
          <el-button size="mini" type="primary" @click="batchDeleteUser">批量删除</el-button>
        </template>
      </tableCmpt>
      <addUserDialog :flag="dialog_add_user" @close="close" @refreshUserTable="refreshUserTable" />
    </el-row>
  </div>
</template>
<script>
import SelectEle from "components/Select";
import tableCmpt from "components/Table";
import addUserDialog from "./dialog/add";
import { DeleteUser } from "@/api/user";
export default {
  name: "User",
  components: { SelectEle, tableCmpt, addUserDialog },
  data() {
    return {
      dialog_add_user: false,
      selestValue: "",
      options: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" }
      ],
      configOptions: ["name", "phone", "email"],
      configTable: {
        selection: true,
        recordCheckbox: true,
        tHead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: "180"
          },
          {
            label: "真实姓名",
            field: "truename",
            width: "180"
          },
          {
            label: "手机号",
            field: "phone"
          },
          {
            label: "地区",
            field: "region"
          },
          {
            label: "角色",
            field: "role"
          },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation",
            width: "220"
          }
        ],
        // 请求接口URL
        requestData: {
          url: "getUserList",
          method: "post",
          data: {
            pageNumber: 1,
            pageSize: 10
          }
        }
      },
      // 表格选中的数据
      tableRowData: {}
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 关闭新增弹框
    close() {
      this.dialog_add_user = false;
    },
    // 新增刷新表格
    refreshUserTable() {
      this.$refs.userTable.getTableData();
    },
    deleteUser(rowData) {
      let ids = [rowData.id];
      this.messageBoxFun({
        tip: "提示",
        content: "确认删除当前信息,确认后无法恢复！",
        tipType: "warning",
        confirmFun: this.confirmDel,
        cancelFun: this.cancelDel,
        handleData: ids
      });
    },
    editUser(rowData) {
      console.log(rowData.data.name);
    },
    // 批量删除
    batchDeleteUser() {
      let ids = this.tableRowData.ids;
      if (!ids || ids.length === 0) {
        this.$message({
          message: "请勾选需要删除的数据！",
          type: "info"
        });
      } else {
        this.messageBoxFun({
          tip: "提示",
          content: "确认删除当前信息,确认后无法恢复！",
          tipType: "warning",
          confirmFun: this.confirmDel,
          cancelFun: this.cancelDel,
          handleData: ids
        });
      }
    },
    // 确认删除
    confirmDel(params) {
      DeleteUser({ id: params })
        .then(res => {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.$refs.userTable.getTableData();
        })
        .catch(err => {});
    },
    // 取消删除
    cancelDel(params) {
      this.$message({
        message: "取消删除",
        type: "info"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  @include labelDom(left, 60, 40);
  margin-bottom: 15px;
}
</style>

<!--
初始化的数据，不需要监听
可以在挂载之前预处理
-->

<!--
v-slot插槽  父组件传内容到子组件显示
1.匿名插槽  <slot></slot> 出现几次，显示几次，没有指定某一个，全部都显示
2.具名插槽，指定插槽显示内容
3.作用域插槽，可以进行数据绑定，父子组件通信,子组件将数据传给父组件，父组件对数据进行操作
-->