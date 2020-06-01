import cookie from 'cookie_js';
import { Login, GetUserInfo } from "@/api/login";
import { setToken, setUserName, getUserName, removeToken, removeUserName } from '@/utils/app';
const app = {
  namespaced: true,
  state: {
    isCollapse: false || JSON.parse(sessionStorage.getItem('isCollapse')),
    // isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false
    // isCollapse: JSON.parse(cookie.get('isCollapse')) || false
    token: '',
    username: getUserName() || '',
    roles: []
  },
  getters: {
    // computed
    isCollapse: state => state.isCollapse,
    username: state => state.username,
    roles: state => state.roles
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
    },
    SET_ROLES(state, value) {
      state.roles = value;
      console.log(state.roles)
    }
  },
  actions: {
    login({ commit }, param) {
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
        commit('asyncRouter/RESET_ROUTERS', null, { root: true });
        resolve()
      })
    },
    /**
     * 获取用户信息
     */
    getUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        GetUserInfo({}).then(res => {
          let data = res.data.data;
          commit('SET_ROLES', data);
          resolve(data)
        }).catch(err => {

        })
      })
    }
  }
}

export default app;
