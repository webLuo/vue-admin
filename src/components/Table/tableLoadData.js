import { loadTableData } from "@/api/common";
import requestUrl from "@/api/requestUrl";
export function loadData(requestData) {
  let resParams = requestData;
  let params = {
    url: requestUrl[resParams.url],
    method: resParams.method,
    data: {
      pageNumber: resParams.data.pageNumber,
      pageSize: resParams.data.pageSize
    }
  };
  return loadTableData(params)
    .then(res => {
      return res
    })
    .catch(error => { });
}