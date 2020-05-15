import { GetCategory, GetCategoryAll } from "@/api/info";
import service from "@/utils/request";

// 获取只有一级数据的类型
export function getInfoCategory() {
  return GetCategory({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

// 获取有两级数据的类型
export function getInfoCategoryAll() {
  return GetCategoryAll({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}

// 获取七牛云的token
export function GetQiniuToken(data) {
  return service.request({
    method: "post",
    url: "/uploadImgToken/",
    data
  })
}
