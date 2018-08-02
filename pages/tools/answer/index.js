// pages/tools/answer/index.js
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
  /**
   * 输入
   */
  onInput: function (event) {
    this.question = event.detail.value;
  },
  /**
   * 提问
   */
  onConfirm: function() {
    if (!this.question || this.question.length === 0) {
      wx.showToast({ title: '请输入问题', icon: 'none' });
      return;
    }
    wx.request({
      url: `${config.api}/answer`,
      data: { question: this.question },
      complete: res => {
        console.log(res);
        const { data = {} } = res;
        const { status, result } = data;
        if (status === '0') {
          this.setData({ result });
        } else {
          wx.showModal({
            title: '错误',
            content: '请求出现异常，请稍后重试',
          });
        }
      }
    })
  }
})