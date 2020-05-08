import Vue from 'vue';
import SvgIcon from './SvgIcon'
Vue.component('svg-icon', SvgIcon)


//  require.context()三个参数的作用
//  1.读取指定目录的所有文件
//  2.是否遍历子集目录
//  3.遍历规则，读取末尾为.svg的文件
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
  return requireContext.keys().map(requireContext)
}
requireAll(req)
