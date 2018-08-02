// pages/tools/cars/brand/index.js
const config = require('../../../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '玩命加载中...' });
    const { id } = options;
    wx.request({
      data: {
        id,
        type: 'carlist',
      },
      url: `${config.api}/car`,
      complete: res => {
        const { result } = res.data;
        console.log(result);
        if (result) {
          this.setData({ list: result.map(item => {
            return {
              ...item,
              carlist: item.carlist.map(car => {
                const { list = [] } = car;
                const saleList = list.filter(c => c.salestate === '在销');
                const prices = saleList.map(c => parseFloat(c.price));
                let price = '暂无报价';
                if (prices.length === 1) {
                  price = `${prices[0]}万`;
                } else if (prices.length > 1) {
                  price = `${Math.min(...prices)} ~ ${Math.max(...prices)}万`;
                }
                return {
                  ...car,
                  price,
                };
              }),
            };
          }) }, () => {
            wx.hideLoading();
          });
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
  
  },
  gotoCarDetail: function (event) {
    const { id, detail } = event.currentTarget.dataset;
    wx.setStorageSync('car_detail', detail);
    wx.navigateTo({
      url: `/pages/tools/cars/detail/index?id=${id}`,
    })
  }
})