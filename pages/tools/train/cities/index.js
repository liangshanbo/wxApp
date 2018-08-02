// pages/tools/train/cities/index.js
const config = require('../../../../config.js');

const STATION = {
  FM: 1,
  TO: 2,
};

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fm: null,
    to: null,
    favoriteList: null,
    stationList: null,
    actived: STATION.FM,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { fm, to } = options;
    const fromStation = JSON.parse(decodeURI(fm));
    wx.showLoading({
      title: '正在加载城市...',
    });
    this.getFavorite(fromStation);
    this.getAllStation();
    this.setData({
      fm: fromStation,
      to: JSON.parse(decodeURI(to)),
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
  /**
   * 获取热门城市
   */
  getFavorite: function(fm) {
    wx.request({
      url: `${config.api}/train/favorite_name`,
      complete: res => {
        let favoriteList = [];
        const cityList = [fm].concat(res.data);
        const len = cityList.length;
        for (let i = 0; i < len - 4; i+=5 ) {
          const cities = [
            cityList[i], 
            cityList[i + 1], 
            cityList[i + 2], 
            cityList[i + 3], 
            cityList[i + 4], 
          ];
          favoriteList.push(cities);
        }
        console.log(favoriteList);
        this.setData({
          favoriteList,
        });
      }
    })
  },
  getAllStation: function() {
    wx.request({
      url: `${config.api}/train/station_name`,
      complete: res => {
        this.setData({
          stationList: res.data,
        });
        wx.hideLoading();
      }
    })
  },
  onCityChange: function(e) {
    const { actived } = this.data;
    const { key, name } = e.currentTarget.dataset;
    switch(actived) {
      case STATION.FM: this.setData({ fm: { key, value: name} }); break;
      case STATION.TO: this.setData({ to: { key, value: name } }); break;
    } 
  },
  onFmFocus: function() {
    this.setData({ actived: STATION.FM });
  },
  onToFocus: function () {
    this.setData({ actived: STATION.TO });
  },
  submit: function() {
    const { fm, to } = this.data;
    wx.redirectTo({
      url: `/pages/tools/train/index?fm=${this.encode(fm)}&to=${this.encode(to)}`,
  });
  },
  encode: function (value) {
    return encodeURI(JSON.stringify(value));
  }
});