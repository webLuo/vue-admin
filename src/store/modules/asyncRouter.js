import { defaultRoutes, asyncRoutes } from "@/router";
const asyncRouter = {
  namespaced: true,
  state: {
    allRouters: defaultRoutes,
    addRouters: [],
  },
  getters: {
    allRouters: state => state.allRouters,
    addRouters: state => state.addRouters
  },
  mutations: {
    SET_ROUTER(state, value) {
      state.addRouters = value;
      state.allRouters = defaultRoutes.concat(value);
      console.log(state.allRouters);
    },
    RESET_ROUTERS(state, value) {
      state.addRouters = null
      state.allRouters = defaultRoutes
    }
  },
  actions: {
    createRouter({ commit }, params) {
      return new Promise((resolve, reject) => {
        let roles = params;
        let addRouters = [];
        // 超管admin
        if (roles.role.includes('admin')) {
          addRouters = asyncRoutes;
        } else {// 普通管理员
          addRouters = asyncRoutes.filter(item => {
            if (roles.role.includes(item.meta.system)) {
              return item;
            }
          })
        }
        // 更新路由
        console.log(addRouters)
        commit("SET_ROUTER", addRouters);
        resolve(addRouters);
      })
    }
  }
}

export default asyncRouter;
