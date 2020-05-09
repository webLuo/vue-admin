import router from "../router/index";
import store from "../store/index"
import { getToken, removeToken, removeUserName } from "./app"

const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    console.log('token存在')
    if (to.path == '/login') {
      removeToken()
      removeUserName()
      store.commit('SET_TOKEN', '')
      store.commit('SET_USERNAME', '')
      next()
    } else {
      // 路由动态添加，分配菜单，每个角色分配不同的菜单
      next()
    }
  } else {
    console.log('token不存在')
    /**
     * 1.直接进入非login的路由，参数to.path变成了非'/login'，触发beforeEach
     * 2.白名单不包含该路由，next指向了login，再次发生路由指向，再跑beforeEach，参数to被改变成了'/login'
     * 3.白名单判断存在，执行next()，没有参数，不会再次beforeEach，就不会发生死循环了
     */
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login')
    }
  }
})