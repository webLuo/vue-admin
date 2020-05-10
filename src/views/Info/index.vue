<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select v-model="category_value" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in type_datas"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="label-wrap date">
          <label for>日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%;"
              v-model="date_value"
              type="datetimerange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              default-time="['12:00:00', '08:00:00']"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="label-wrap keyword">
          <label for>关键字：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-select v-model="search_key" placeholder="请选择" style="width:100%;">
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
        <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger">搜索</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger" class="pull-right" @click="dialog_info = true">新增</el-button>
      </el-col>
    </el-row>
    <div class="black-space-15"></div>
    <!-- 表格数据 -->
    <el-table :data="table_datas" border style="width: 100%">
      <el-table-column align="center" type="selection" width="45"></el-table-column>
      <el-table-column align="center" prop="title" label="标题"></el-table-column>
      <el-table-column align="center" prop="category" label="类别" width="130"></el-table-column>
      <el-table-column align="center" prop="date" label="日期" width="237"></el-table-column>
      <el-table-column align="center" prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" @click="deleteRow(scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="editRow(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="black-space-15"></div>
    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button @click="deleteBatch">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          background
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 新增弹窗 -->
    <DialogInfo :flag.sync="dialog_info" @close="close" />
  </div>
</template>
<script>
import DialogInfo from "./dialog/info";
export default {
  name: "InfoIndex",
  components: { DialogInfo },
  data() {
    return {
      type_datas: [
        {
          value: 1,
          label: "国际信息"
        },
        {
          value: 2,
          label: "国内信息"
        },
        {
          value: 3,
          label: "行业信息"
        }
      ],
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
      table_datas: [
        {
          title: "纽约市长白思浩宣布退出竞选，特朗普首发退回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title: "纽约市长白思浩宣布退出竞选，特朗普首发退回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "张三"
        },
        {
          title: "纽约市长白思浩宣布退出竞选，特朗普首发退回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "李四"
        },
        {
          title: "纽约市长白思浩宣布退出竞选，特朗普首发退回应",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "王五"
        }
      ],
      // 查询数据
      category_value: "",
      date_value: [],
      search_key: "id",
      search_keyWork: "",
      // 弹窗父传子
      dialog_info: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 删除单个表格数据
    deleteRow(rowData) {
      this.messageBoxFun({
        tip: "提示",
        content: "确认删除当前信息,确认后无法恢复！",
        tipType: "warning"
      });
    },
    // 编辑表格行数据
    editRow(rowData) {},
    // 关闭新增编辑弹框
    close() {
      this.dialog_info = false;
    },
    // 批量删除表格数据
    deleteBatch(rowsData) {
      this.messageBoxFun({
        tip: "警告",
        content: "确认删除选择的信息,确认后无法恢复！",
        tipType: "error"
      });
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
    @include labelDom(left, 93, 40);
  }
  &.keyword {
    @include labelDom(left, 93, 40);
  }
}
</style>
