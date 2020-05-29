import regPattern from './pattern';
const validateUsername = (rule, value, callback) => {
  if (value) {
    if (!regPattern.email.test(value)) {
      callback(new Error('大于4位的字母数字或下划线'))
    } else {
      callback()
    }
  } else {
    callback()
  }
}
export default {
  validateUsername
}