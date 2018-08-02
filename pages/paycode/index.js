let brightness = 0.5;
wx.getScreenBrightness({
  success: (res) => {
    brightness = res.value;
  }
});
Page({
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onLoad: function () {
    wx.setScreenBrightness({ value: 1 });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.setScreenBrightness({ value: brightness });
  },
  /**
   * 点击搜索
   */
  onConfirm: function(event) {
    console.log(event);
  }
});