import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout/index.vue'
Vue.use(VueRouter);
/**
 * 动态路由
 * 1.系统分配  多选配置
 * 2.角色分配  单选配置
 */

/**
 * 1.默认路由
 * 2.动态路由
 */

// 默认路由
export const defaultRoutes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: '主页'
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: () => import("@/views/Login/index.vue"),
    meta: {
      name: '登录'
    }
  },
  {
    path: "",
    name: "Console",
    redirect: "dash",
    component: Layout,
    meta: {
      name: '控制台',
      icon: 'console'
    },
    children: [
      {
        path: "/dash",
        name: "Index",
        component: () => import("@/views/Console/index.vue"),
        meta: {
          name: '首页'
        }
      }
    ]
  },
]

// 动态路由
export const asyncRoutes = [
  {
    path: "/info",
    name: "Info",
    component: Layout,
    meta: {
      system: '信息功能', // 自定义属性
      name: '信息管理',
      icon: 'info'
    },
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        component: () => import("@/views/Info/index.vue"),
        meta: {
          name: '信息列表'
        }
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("@/views/Info/category.vue"),
        meta: {
          name: '信息分类'
        }
      },
      {
        path: "/infoDetail",
        name: "InfoDetail",
        hidden: true,
        component: () => import("@/views/Info/infoDetail.vue"),
        meta: {
          name: '信息详情'
        }
      }
    ]
  },
  {
    path: "/user",
    name: "User",
    redirect: "index",
    component: Layout,
    meta: {
      name: '用户管理',
      icon: 'user',
      system: '用户功能'
    },
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        component: () => import("@/views/User/index.vue"),
        meta: {
          name: '用户列表'
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes: defaultRoutes
});

export default router;
