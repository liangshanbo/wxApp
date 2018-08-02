// pages/tools/jingdian/index.js
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { sid = '7c61b820db6e97289b7ef8fd', surl = 'gugong' } = options;
    wx.request({
      data: {
        surl,
        id: sid,
      },
      url: `${config.api}/jingdian/detail`,
      complete: res => {
        const { data } = res;
        const { images, type, season, dcnt = '' } = data;
        if (data) {
          this.setData({ detail: {
            type,
            season,
            list: images,
            dcnt: dcnt.slice(1),
          }});
        }
        console.log(res.data);
      }
    })
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
  
  }
})