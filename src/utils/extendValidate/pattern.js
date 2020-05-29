const cellPhone = /^1[34578]\d{9}$/
const complexPassword = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
const vehicleNumber = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{3,5}[A-Z0-9挂学警港澳]{1}$/
const email = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
const code = /^[a-z0-9]{6}$/
const truename = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,8}$/
export default {
  cellPhone,
  complexPassword,
  vehicleNumber,
  email,
  code,
  truename
}
