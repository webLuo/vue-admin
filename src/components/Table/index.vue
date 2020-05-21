<template>
  <div>
    <el-table :data="tableData" border style="width: 100%" @selection-change="handlerCheckedChange">
      <!--多选框-->
      <el-table-column v-if="tableConfig.selection" align="center" type="selection" width="45"></el-table-column>
      <template v-for="item in tableConfig.tHead">
        <!--v-slot-->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType == 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!--文本数据渲染-->
        <el-table-column
          v-else
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
    <div class="table-footer">
      <el-row>
        <el-col :span="4">
          <slot name="batchDelBtn"></slot>
        </el-col>
        <el-col :span="20">
          <el-pagination
            class="pull-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import tableLoadData from "@/mixins/Table/tableLoadData";
import tablePagination from "@/mixins/Table/pagination";
import { recordPage } from "./record";
export default {
  name: "tableCmpt",
  mixins: [tableLoadData, tablePagination],
  components: {},
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    tableRowData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableConfig: {
        // 多选框
        selection: true,
        // 翻页记录checkbox
        recordCheckbox: false,
        // 表头
        tHead: [],
        // 接口请求方法
        requestData: {}
      },
      // 表格数据
      tableData: []
    };
  },
  created() {},
  beforeMount() {
    this.initTableConfig();
    // 可以使用对象合并的es6的方法
    // this.tableConfig = Object.assign(this.tableConfig, this.config);
  },
  mounted() {},
  methods: {
    // 初始化table配置项 Object.keys(Array)  Array.includes(key)
    // 匹配相同的key，如果存在，则替换
    initTableConfig() {
      let keys = Object.keys(this.tableConfig);
      for (let key in this.config) {
        // if (this.tableConfig[key]) {
        //   this.tableConfig[key] = this.config[key];
        // }
        if (keys.includes(key)) {
          this.tableConfig[key] = this.config[key];
        }
      }
    },
    // 表格选择项改变
    handlerCheckedChange(val) {
      let rowDatas = {
        ids: val.map(item => item.id),
        datas: val
      };
      this.$emit("update:tableRowData", rowDatas);
    }
  }
};
</script>
<style lang="scss" scoped>
.table-footer {
  padding: 15px;
}
</style>
