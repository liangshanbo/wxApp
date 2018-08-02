// pages/map/index.js
const amapFile = require('../../libs/amap-wx.js');
const config = require('../../config.js');
let markersData = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: '',
    scale: false,
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  timestamp: 0,
  /**
   * 高德地图Demo
   */
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "/images/map/location_fill.png"; 
      } else {
        data[j].iconPath = "/images/icons/location_fill.png";
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: config.amap_key });
    myAmapFun.getPoiAround({
      iconPathSelected: "/images/map/location_fill.png",
      iconPath: '/images/map/location_fill.png',
      success: function (data) {
        markersData = data.markers;
        that.setData({
          markers: markersData
        });
        that.setData({
          latitude: markersData[0].latitude
        });
        that.setData({
          longitude: markersData[0].longitude
        });
        that.showMarkerInfo(markersData, 0);
      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({
      url: 'http://nodejs.cn/api/fs.html#fs_fs_stat_path_options_callback'
    });
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
   * map_click
   */
  map_click: function() {
    const now = Date.now();
    const { scale } = this.data;
    if (now - this.timestamp < 300) {
      this.setData({
        scale: !scale
      });
    }
    this.timestamp = now;
  }
})