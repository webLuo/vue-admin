import { GetCategory, GetCategoryAll } from "@/api/info";
export function getInfoCategory() {
  return GetCategory({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}
export function getInfoCategoryAll() {
  return GetCategoryAll({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}