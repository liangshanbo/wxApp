const NOOP = () => {};

const formatTime = (date, hasTime = false) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const formatedDate = [year, month, day].map(formatNumber).join('-');
  if (hasTime) {
    return formatedDate + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  return formatedDate;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const saveFile = params => {
  const { tempFilePath, success = NOOP, fail = NOOP, complete = NOOP } = params;
  wx.saveFile({
    fail,
    success,
    complete,
    tempFilePath,
  })
}

module.exports = {
  saveFile: saveFile,
  formatTime: formatTime
}
