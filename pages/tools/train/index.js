// pages/tools/train/index.js
const config = require('../../../config.js');
const util = require('../../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tody: '',
    date: '',
    to: { key: 'SHH', value: '上海' },
    fm: { key: 'BJP', value: '北京' },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { fm, to } = options;
    const tody = util.formatTime(new Date());
    console.log(tody);
    this.setData({ tody, date: tody });
    if (fm && to) {
      this.setData({
        fm: JSON.parse(decodeURI(fm)),
        to: JSON.parse(decodeURI(to)),
      });
    }
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
   * 出发地和目的地置换
   */
  onTransfer: function() {
    const { fm, to } = this.data;
    this.setData({
      to: fm,
      fm: to,
    });
  },
  /**
   * onConfirm
   */
  onConfirm: function() {
    const { fm, to, date } = this.data;
    wx.redirectTo({
      url: `/pages/tools/train/result/index?fm=${fm.key}&to=${to.key}&date=${date}`});

  },
  gotoCity: function() {
    const { fm, to } = this.data;
    wx.redirectTo({
      url: `/pages/tools/train/cities/index?fm=${this.encode(fm)}&to=${this.encode(to)}`,
    });
  },
  encode: function(value) {
    return encodeURI(JSON.stringify(value));
  },
  dateChange: function(e) {
    const { value } = e.detail;
    this.setData({ date: value });
  },
})