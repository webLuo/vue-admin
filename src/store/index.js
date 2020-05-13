import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import app from "./modules/app";
import login from "./modules/login";
import info from "./modules/info";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    login,
    common,
    info
  }
});
