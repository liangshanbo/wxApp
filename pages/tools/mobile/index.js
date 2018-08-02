// pages/tools/mobile/index.js
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  onInput: function(event) {
    this.phone = event.detail.value;
  },
  onConfirm: function() {
    const phone = this.phone;
    if (/^1[35678]\d{9}/.test(phone)) {
      wx.request({
        url: `${config.api}/check_mobile`,
        data: {
          phone,
        },
        complete: res => {
          const { result } = res.data;
          if (result) {
            this.setData({
              result,
            });
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入11位正确的手机号码',
      })
    }
  }
})