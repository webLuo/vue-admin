import { loadTableData } from "@/api/common";
import requestUrl from "@/api/requestUrl";
const tableLoadData = {
  data() {
    return {}
  },
  created() { },
  mounted() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      let resParams = this.tableConfig.requestData;
      let params = {
        url: requestUrl[resParams.url],
        method: resParams.method,
        data: {
          pageNumber: resParams.data.pageNumber,
          pageSize: resParams.data.pageSize
        }
      };
      loadTableData(params)
        .then(res => {
          let data = res.data.data.data;
          if (data && data.length > 0) {
            // 赋值
            this.tableData = data;
            // 数据统计
            this.total = res.data.data.total;
          }
        })
        .catch(error => { });
    }
  }
}

export default tableLoadData