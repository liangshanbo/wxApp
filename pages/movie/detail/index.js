// pages/movie/detail/index.js
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {
      attrs: {},
      casts: [],
      directors: [],
      collect_count: [],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options;
    wx.showLoading({ title: '玩命加载中...' });
    wx.getStorage({
      key: id,
      success: ({ data }) => {
        this.setData({
          casts: data.casts,
          directors: data.directors,
          collect_count: data.collect_count,
        });
      }
    });
    wx.request({
      data: {
        id,
      },
      url: `${config.api}/movie`,
      complete: (res) => {
        wx.hideLoading();
        const { statusCode, data } = res;
        const { attrs } = data;
        if ( statusCode === 200 ) {
          this.setData({ detail: {
            ...data,
            ...attrs,
            language: attrs.language.join(' / '),
          }});
        }
      }
    });
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