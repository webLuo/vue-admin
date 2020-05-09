import cookie from 'cookie_js';
import { Login } from "@/api/login";
import { setToken, setUserName, getUserName, removeToken, removeUserName } from '@/utils/app';
const app = {
  state: {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    // isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false
    // isCollapse: JSON.parse(cookie.get('isCollapse')) || false
    token: '',
    username: getUserName() || '',
  },
  getters: {
    // computed
    isCollapse: state => state.isCollapse,
    username: state => state.username
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse
      sessionStorage.setItem('isCollapse', state.isCollapse);
      // localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
      // cookie.set('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value) {
      state.token = value;
    },
    SET_USERNAME(state, value) {
      state.username = value;
    }
  },
  actions: {
    login({ commit }, param) {
      console.log(param)
      return new Promise((resolve, reject) => {
        Login(param).then((response) => {
          let data = response.data.data;
          commit('SET_TOKEN', data.token);
          commit('SET_USERNAME', data.username);
          setToken(data.token)
          setUserName(data.username)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        removeToken()
        removeUserName()
        commit('SET_TOKEN', '');
        commit('SET_USERNAME', '');
        resolve()
      })
    }
  },
  modules: {}
}

export default app;
