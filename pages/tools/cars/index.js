// pages/tools/cars/index.js
const config = require('../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keys: [],
    list: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '玩命加载中...',
    });
    wx.request({
      data: {
        id: '',
        type: 'brand',
      },
      url: `${config.api}/car`,
      complete: res => {
        const { result = [] } = res.data;
        if (result.length) {
          const list = result.reduce((total, current) => {
            const { initial, logo } = current;
            if (initial && /png/.test(current.logo)) {
              const to = total[initial];
              total[initial] = to ? to.concat([current]) : [];
            }
            return total;
          }, {});
          this.setData({
            list: list,
            keys: Object.keys(list).sort(),
          }, () => { wx.hideLoading(); });
        }
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
  
  },
  /**
   * 
   */
  gotoCarList: function (event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/tools/cars/brand/index?id=${id}`,
    })
  }
})