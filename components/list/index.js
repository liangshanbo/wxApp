const temp = {
  tap: function (event) {
    const { item } = event.target.dataset;
    if (item && item.type === 'settings') {
      wx.openSetting({
        success: function (authSetting) {
          console.log(authSetting);
        },
        fail: function(error) {
          wx.showModal({
            title: '失败',
            content: error.errMsg,
          })
        }
      });
    }
  }
}
//导出，供外部使用
module.exports = temp;