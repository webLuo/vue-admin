import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout/index.vue'
Vue.use(VueRouter);

const routes = [
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
    path: "/console",
    name: "Console",
    redirect: "index",
    component: Layout,
    meta: {
      name: '控制台',
      icon: 'console'
    },
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("@/views/Console/index.vue"),
        meta: {
          name: '首页'
        }
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    component: Layout,
    meta: {
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
      icon: 'user'
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
];

const router = new VueRouter({
  routes
});

export default router;
