// pages/tools/weather/index.js
const amapFile = require('../../../libs/amap-wx.js');
const config = require('../../../config.js'); 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weather: null,
    region: ['北京市', '北京市', '西城区'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const myAmapFun = new amapFile.AMapWX({ key: config.amap_key });
    myAmapFun.getRegeo({
      success: (data) => {
        if (data && data.length) {
          const { latitude, longitude, regeocodeData = {} } = data[0];
          const { 
            city,
            citycode,
            district,
            province
          } = regeocodeData.addressComponent || {};
          const region = [province, city.length ? city[0] : province, district];
          this.setData({
            latitude,
            longitude,
            citycode,
            region,
          });
          this.bindRegionChange({ detail: { value: region } });
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
  /**
   * 切换城市
   */
  bindRegionChange: function(e) {
    const { value } = e.detail;
    this.setData({ region: value });
    wx.request({
      url: `${config.api}/weather`,
      data: {
        city: value[1],
        path: 'query',
      },
      complete: res => {
        const { result } = res.data;
        if (result) {
          this.setData({
            weather: { ...result, daily: result.daily.map(item => {
              return { 
                ...item, 
                date: item.date.slice(-1), 
                week: item.week.slice(-1) 
              };
            })},
          });
        }
      }
    })
  }
})