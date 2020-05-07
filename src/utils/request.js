import axios from "axios";
import { Message } from 'element-ui'

// 创建axios，赋给变量service
// A总接口-http://www.web-jshtml.cn/productapi
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devApi";
console.log(BASEURL)
const service = axios.create({
  baseURL: BASEURL,
  timeout: 5000
});
console.log(process.env.NODE_ENV);
console.log(process.env.VUE_APP_ABC);
// 添加请求拦截器
/**
 * 请求接口前，做一些处理(请求拦截器)
 */
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // token userId ...... 在请求头添加后台需要前端添加的参数
    // config.header['Token'] = 'xxx'
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
/**
 * 请求接口后，返回数据进行拦截(响应拦截器)
 */
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    let data = response.data
    if (data.resCode !== 0) {
      Message.error(data.message)
      return Promise.reject(data);
    } else {
      return response;
    }
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default service;

/**
 * 使用export default
 * 文件import不使用花括号
 */
