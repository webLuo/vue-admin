import { loadTableData } from "@/api/common";
import requestUrl from "@/api/requestUrl";
const tableLoadData = {
  data() {
    return {}
  },
  created() { },
  mounted() {
    this.refreshData()
  },
  methods: {
    // 刷新表格数据
    refreshData() {
      this.getTableData(this.tableConfig.requestData)
    },
    getTableDataParams(params) {
      let requestData = Object.assign({}, params);
      this.tableConfig.requestData.data = requestData;
      this.getTableData(this.tableConfig.requestData);
    },
    getTableData(requestData) {
      let params = {
        url: requestUrl[requestData.url],
        method: requestData.method,
        data: requestData.data
      };
      loadTableData(params)
        .then(res => {
          let data = res.data.data.data;
          // 赋值
          this.tableData = data;
          // 数据统计
          this.total = res.data.data.total || data.length;
        })
        .catch(error => { });
    }
  }
}

export default tableLoadData