const tablePagination = {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizes: [10, 20, 50, 100]
    }
  },
  created() {
  },
  mounted() {
    this.pageSize = this.tableConfig.requestData.data.pageSize;
  },
  methods: {
    handleSizeChange(val) {
      this.tableConfig.requestData.data.pageSize = val;
      this.refreshData()
    },
    handleCurrentChange(val) {
      this.tableConfig.requestData.data.pageNumber = val;
      this.refreshData()
    }
  }
}
export default tablePagination