export function timeStampToTime(params) {
  // 时间戳为10位乘以1000，13位不需要乘以1000
  params.switchVal = params.switchVal.length == 10 ? params.switchVal * 1000 : params.switchVal;
  var date = new Date(params.switchVal);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  if (params.formatVal == 'date') {
    return Y + M + D;
  } else if (params.formatVal == 'time') {
    return Y + M + D + h + m + s;
  }
}