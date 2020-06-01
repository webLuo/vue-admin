const info = {
  namespaced: true,
  state: {
    id: "" || sessionStorage.getItem("infoId"),
    title: "" || sessionStorage.getItem("infoTitle")
  },
  getters: {
    id: state => state.id,
    title: state => state.title
  },
  mutations: {
    // 通过循环一次存储
    UPDATE_STATE_VALUE(state, params) {
      for (let key in params) {
        state[key] = params[key].value
        if (params[key].session) {
          sessionStorage.setItem(params[key].sessionKey, params[key].value);
        }
      }
    },
    // SET_ID(state, value) {
    //   state.id = value;
    //   sessionStorage.setItem("infoId", value);
    // },
    // SET_TITLE(state, value) {
    //   state.title = value;
    //   sessionStorage.setItem("infoTitle", value);
    // }
  },
  actions: {}
}

export default info;
