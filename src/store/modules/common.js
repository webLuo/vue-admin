import { GetCategory } from "@/api/info";
const common = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    getCategoryData({ commit }, param) {
      return new Promise((resolve, reject) => {
        GetCategory({}).then((response) => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default common;
