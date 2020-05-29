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
 * 验证用户名
 */
export function validateUserName(rule, value, callback) {
  let reg = /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('用户名格式错误'));
    } else {
      callback()
    }
  } else {
    callback()
  }

}

/**
 * 验证姓名
 */
export function validateTrueName(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{2,8}$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('姓名为2-8位中文或字母'));
    } else {
      callback()
    }
  } else {
    callback()
  }

}

/**
 * 验证用户密码
 */
export function validateUserPassword(rule, value, callback) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('密码为6-20位数字加字母'));
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**
 * 验证手机号
 */
export function validatePhone(rule, value, callback) {
  let reg = /^1[3456789]\d{9}$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('手机号码为11位数字'));
    } else {
      callback()
    }
  } else {
    callback()
  }
}

/**
 * 验证标题
 */
export function validateTitle(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('只能输入数字字母和汉字'));
    } else {
      callback()
    }
  } else {
    callback()
  }

}

/**
 * 验证内容
 */
export function validateContent(rule, value, callback) {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5\,，.。！!?？：:;；‘’""''“”、]+$/;
  if (value) {
    if (!reg.test(value)) {
      callback(new Error('只能输入数字字母和汉字以及常用符号'));
    } else {
      callback()
    }
  } else {
    callback()
  }

}

/**
 * 未使用default，可以同时声明多个export
 * 文件import需要使用花括号
 */
