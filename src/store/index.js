import Vue from "vue";
import Vuex from "vuex";
import common from "./modules/common";
import app from "./modules/app";
import info from "./modules/info";
import asyncRouter from "./modules/asyncRouter";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    common,
    info,
    asyncRouter
  }
});
