// pages/tools/mobile/index.js
const config = require('../../../config.js');
const statuses = ['在途中', '在途中', '正在派件', '已签收', '派送失败'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    result: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { code } = options;
    if (code) {
      this.setData({ code });
      this.onConfirm(code);
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
  onInput: function (event) {
    this.code = event.detail.value;
  },
  onConfirm: function (code) {
    const expressCode = typeof code === 'string' ? code : this.code;
    if (/\d{12,13}/.test(expressCode)) {
      wx.request({
        data: { code: expressCode },
        url: `${config.api}/express`,
        complete: res => {
          const { msg, result } = res.data;
          if (result) {
            this.setData({
              result: { 
                ...result, 
                status: statuses[result.deliverystatus],
                list: result.list.map(item => {
                  const dateTime = item.time.split(' ');
                  return {
                    status: item.status,
                    date: dateTime[0].slice(5),
                    time: dateTime[1].slice(0, -3),
                  }
                }), 
              },
            });
          } else {
           wx.showToast({ title: msg });
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请输入12或13位正确的快递单号',
      })
    }
  }
})