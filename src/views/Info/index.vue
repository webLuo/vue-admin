<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select
              v-model="listForm.category_value"
              placeholder="请选择"
              style="width:100%;"
              clearable
            >
              <el-option
                v-for="item in categoryData"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap date">
          <label for="date_value">日期：</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%;"
              v-model="listForm.date_value"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap keyword">
          <label for>关键字：</label>
          <div class="wrap-content">
            <el-select v-model="listForm.search_key" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in keyWords_datas"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="listForm.search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" @click="searchInfoList">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" class="pull-right" @click="addInfo" v-if="btnPermit('info:add')">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-15"></div>
    <!-- 表格数据 -->
    <el-table
      :data="table_datas"
      border
      style="width: 100%"
      v-loading="table_loading"
      @selection-change="selectChange"
    >
      <el-table-column align="center" type="selection" width="45"></el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column
        align="center"
        prop="categoryId"
        label="类别"
        width="130"
        :formatter="toCategory"
      ></el-table-column>
      <el-table-column align="center" prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column align="center" prop="createDate" label="日期" width="237" :formatter="toDate"></el-table-column>
      <!-- <el-table-column align="center" prop="content" label="内容"></el-table-column> -->
      <el-table-column align="center" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            @click="deleteRow(scope.row)"
            v-if="btnPermit('info:del')"
          >删除</el-button>
          <el-button
            type="success"
            size="mini"
            @click="editRow(scope.row)"
            v-if="btnPermit('info:edit')"
          >编辑</el-button>
          <!-- <router-link :to="{ name: 'InfoDetail', query: {id: scope.row.id}}">
            <el-button type="success" size="mini">编辑详情</el-button>
          </router-link>-->
          <el-button
            type="success"
            size="mini"
            @click="editDetailRow(scope.row)"
            v-if="btnPermit('info:detailed')"
          >编辑详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-15"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button @click="deleteBatch" v-if="btnPermit('info:batchDel')">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          background
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagintation.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo
      :flag.sync="dialog_info"
      :categoryData="categoryData"
      v-if="categoryData.length>0"
      @close="close"
    />
    <!-- 编辑弹窗 -->
    <DialogEditInfo
      :flag.sync="dialog_info_edit"
      :categoryData="categoryData"
      :editInfo="editInfoRow"
      v-if="categoryData.length>0"
      @closeEdit="closeEdit"
    />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { GetInfoList, DeleteInfo } from "@/api/info";
import { timeStampToTime } from "@/utils/common";
export default {
  name: "InfoIndex",
  components: { DialogInfo, DialogEditInfo },
  data() {
    return {
      categoryData: [],
      keyWords_datas: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      // 表格data
      table_datas: [],
      // 查询数据
      listForm: {
        category_value: "",
        date_value: "",
        search_key: "id",
        search_keyWork: ""
      },
      // 新增弹窗父传子
      dialog_info: false,
      // 修改弹窗
      dialog_info_edit: false,
      // 分页数据
      pagintation: {
        total: 0, // 总数
        pageNum: 1, // 当前页码
        pageSize: 10 // 每页条数
      },
      // 表格加载状态
      table_loading: false,
      // 单个删除ID与批量删除ID数组
      delIdArr: [],
      // 编辑的行数据信息
      editInfoRow: null
    };
  },
  created() {},
  mounted() {
    // 获取分类数据
    this.$store
      .dispatch("common/getCategoryData")
      .then(res => {
        this.categoryData = res.data.data.data;
      })
      .catch(err => {});

    // 获取信息列表数据
    this.getList();
  },
  methods: {
    // 新增信息
    addInfo() {
      if (this.categoryData && this.categoryData.length) {
        this.dialog_info = true;
      } else {
        this.$message({
          type: "info",
          message: "请先创建信息分类！"
        });
      }
    },
    getList() {
      // 表格数据加载状态
      this.table_loading = true;
      const params = this.setSerachParams();
      GetInfoList(params)
        .then(res => {
          let data = res.data.data;
          this.table_datas = data.data;
          this.pagintation.total = data.total;
          this.table_loading = false;
        })
        .catch(err => {
          this.table_loading = false;
        });
    },
    // 类别ID转换
    toCategory(row, column, cellValue, index) {
      let categoryId = row.categoryId;
      let categoryName = this.categoryData.filter(
        item => item.id == row.categoryId
      )[0].category_name;
      return categoryName;
    },
    // 日期格式转换
    toDate(row, column, cellValue, index) {
      let param = {
        switchVal: row.createDate,
        formatVal: "time"
      };
      row.createDate = timeStampToTime(param);
      return row.createDate;
    },
    // 查询列表事件
    searchInfoList() {
      this.getList();
    },
    // 处理查询参数
    setSerachParams() {
      let params = {
        pageNumber: this.pagintation.pageNum,
        pageSize: this.pagintation.pageSize
      };
      // 分类
      if (this.listForm.category_value)
        params.categoryId = this.listForm.category_value;
      // 时间
      if (this.listForm.date_value) {
        params.startTime = this.listForm.date_value[0];
        params.endTime = this.listForm.date_value[1];
      }
      // 关键字，根据select切换查询
      params[this.listForm.search_key] = this.listForm.search_keyWork;
      return params;
    },
    // 每页多少数据改变事件
    handleSizeChange(val) {
      this.pagintation.pageSize = val;
      this.getList();
    },
    // 切换页码事件
    handleCurrentChange(val) {
      this.pagintation.pageNum = val;
      this.getList();
    },
    // 删除单个表格数据
    deleteRow(rowData) {
      this.delIdArr = [rowData.id];
      this.messageBoxFun({
        tip: "提示",
        content: "确认删除当前信息,确认后无法恢复！",
        tipType: "warning",
        confirmFun: this.confirmDel,
        cancelFun: this.cancelDel,
        handleData: this.delIdArr
      });
    },
    // 确认删除
    confirmDel(data) {
      DeleteInfo({ id: data })
        .then(res => {
          this.delIdArr = [];
          this.getList();
          this.$message({
            message: res.data.message,
            type: "success"
          });
        })
        .catch(err => {});
    },
    // 取消删除
    candelDel(data) {
      this.$message({
        message: "取消删除",
        type: "info"
      });
    },
    // 编辑表格行数据
    editRow(rowData) {
      this.dialog_info_edit = true;
      this.editInfoRow = rowData;
    },
    // 编辑详情
    editDetailRow(rowData) {
      // 4.通过vuex 存储传参
      // this.$store.commit("info/SET_ID", rowData.id);
      // this.$store.commit("info/SET_TITLE", rowData.title);
      this.$store.commit("info/UPDATE_STATE_VALUE", {
        id: {
          value: rowData.id,
          sessionKey: "infoId",
          session: true
        },
        title: {
          value: rowData.title,
          sessionKey: "infoTitle"
        }
      });
      this.$router.push({
        // name跳转可以使用params和query path跳转只能实用query
        // name: "InfoDetail",
        // 1.页面刷新参数不丢失，但是参数会在地址栏显示
        // query: {
        //   id: rowData.id
        // }
        // 2.参数在地址栏不显示，但是刷新后页面参数会丢失
        // params: {
        //   id: rowData.id
        // }
        // 3.在路由通过冒号传参，这里不能传对象，无法获取，只能传字符串，页面刷新参数不丢失，但是需要一一去配置，参数显示在路径中
        // {
        //   path: "/infoDetail/:id/:title",
        //   name: "InfoDetail",
        //   hidden: true,
        //   component: () => import("@/views/Info/infoDetail.vue"),
        //   meta: {
        //     name: '信息详情'
        //   }
        // }
        // path: `/infoDetail/${rowData}`
        name: "InfoDetail",
        params: {
          id: rowData.id,
          title: rowData.title
        }
      });
      // 5.新窗口打开，参数不显示
      // html
      // <touter-link target="_blank" :to='{name:"InfoDetail",params:{id: rowData.id},query{id: rowData.id}}'>跳转</router>
      // JS 需要使用query传值，不能传递对象
      // let routeData = this.$router.resolve({
      //   name: "InfoDetail",
      //   query: {
      //     id: rowData.id,
      //     title: rowData.title
      //   }
      // });
      // window.open(routeData.href, "_blank");
    },
    // 关闭新增弹框
    close() {
      this.dialog_info = false;
      this.getList();
    },
    // 关闭编辑弹框
    closeEdit() {
      this.dialog_info_edit = false;
      this.getList();
    },
    // 当表格选择项发生变化时
    selectChange(val) {
      this.delIdArr = val.map(item => item.id);
    },
    // 批量删除表格数据
    deleteBatch(rowsData) {
      if (this.delIdArr.length > 0) {
        this.messageBoxFun({
          tip: "警告",
          content: "确认删除选择的信息,确认后无法恢复！",
          tipType: "error",
          confirmFun: this.confirmDel,
          cancelFun: this.cancelDel,
          handleData: this.delIdArr
        });
      } else {
        this.$message({
          message: "请选择要删除的数据",
          type: "warning"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(left, 60, 40);
  }
  &.keyword {
    @include labelDom(left, 60, 40);
  }
}
</style>
