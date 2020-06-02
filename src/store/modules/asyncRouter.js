import { defaultRoutes, asyncRoutes } from "@/router";
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.role.some(item => route.meta.role.indexOf(item) >= 0)
  }
}
function filterAsyncRoutes(asyncRoutes, roles) {
  let filterRoutes = asyncRoutes.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRoutes(route.children, roles)
      }
      return true
    }
    return false
  })
  return filterRoutes;
}
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
          addRouters = filterAsyncRoutes(asyncRoutes, roles)
          // addRouters = asyncRoutes.filter(item => {
          //   if (hasPermission(roles, item)) {
          //     if (item.children && item.children.length > 0) {
          //       item.children = item.children.filter(child => {
          //         if (hasPermission(roles, child)) {
          //           return child;
          //         }
          //       })
          //     }
          //     return item;
          //   }
          // })
        }
        // 更新路由
        commit("SET_ROUTER", addRouters);
        resolve(addRouters);
      })
    }
  }
}

export default asyncRouter;
