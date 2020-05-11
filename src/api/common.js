import { GetCategory } from "@/api/info";
export function getInfoCategory() {
  return GetCategory({})
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
}