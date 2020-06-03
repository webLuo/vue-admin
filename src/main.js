import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 自定义全局方法
import global from '@/utils/global'

// 自定义全局组件
import "./icons/index.js"

// 路由守卫
import './utils/premission'

// 自定义按钮权限
import { btnPermit } from './utils/btnPermit'

Vue.prototype.btnPermit = btnPermit;
Vue.use(global);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
