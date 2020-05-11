/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value);
}

/**
 * 验证密码
 */
export function validatePassword(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  return reg.test(value);
}

/**
 * 验证验证码
 */
export function validateCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return reg.test(value);
}

/**
 * 验证标题
 */
export function validateTitle(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if (value === '') {
    callback(new Error('请输入标题！'));
  } else if (!reg.test(value)) {
    callback(new Error('只能输入数字字母和汉字'));
  } else {
    callback()
  }
}

/**
 * 验证内容
 */
export function validateContent(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5\,，.。！!?？：:;；‘’""''“”、]+$/;
  if (value === '') {
    callback(new Error('请输入内容！'));
  } else if (!reg.test(value)) {
    callback(new Error('只能输入数字字母和汉字以及常用符号'));
  } else {
    callback()
  }
}

/**
 * 未使用default，可以同时声明多个export
 * 文件import需要使用花括号
 */
