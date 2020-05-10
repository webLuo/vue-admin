import { MessageBox } from 'element-ui';
export default {
  install(Vue, options) {
    // vue原型添加方法
    Vue.prototype.messageBoxFun = (params) => {
      MessageBox.confirm(params.content, params.tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: params.tipType || "warning",
        center: true
      })
        .then(() => {
          params.confirmFun && params.confirmFun(params.handleData)
        })
        .catch(() => {
          params.cancelFun && params.cancelFun(params.handleData)
        });
    }
  }
}