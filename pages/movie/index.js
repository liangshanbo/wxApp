// pages/movie/index.js
const config = require('../../config.js');
const app = getApp();
const city = app.globalData.city;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_index: 1,
    in_theaters: [],
    coming_soon: [],
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
        city,
        path: 'in_theaters',
      },
      url: `${config.api}/movie`,
      success: res => {
        const { subjects = [] } = res.data;
        this.setData({
          in_theaters: subjects.map(subject => {
            return {
              ...subject,
              average: subject.rating.average,
              genres: subject.genres.join(' '),
              thumbnail: subject.images.medium,
              cast: subject.casts.map(cast => cast.name).join(' '),
              director: subject.directors.map(cast => cast.name).join(' '),
            };
          }),
        });
      },
      complete: function() {
        wx.hideLoading();
      }
    });
    wx.request({
      data: {
        city,
        path: 'coming_soon',
      },
      url: `${config.api}/movie`,
      success: res => {
        const { subjects = [] } = res.data;
        this.setData({
          coming_soon: subjects.map(subject => {
            return {
              ...subject,
              average: subject.rating.average,
              genres: subject.genres.join(' '),
              thumbnail: subject.images.medium,
              cast: subject.casts.map(cast => cast.name).join(' '),
              director: subject.directors.map(cast => cast.name).join(' '),
            };
          }),
        });
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
   *  正在热映
   */
  in_theaters_tap: function() {
    if (this.data.tab_index !== 1) {
      this.setData({
        tab_index: 1,
      });
      return;
    }
  },
  /**
   * 即将上映
   */
  coming_soon_tap: function () {
    if (this.data.tab_index !== 2) {
      this.setData({
        tab_index: 2,
      });
    }
    return;
  },
  /**
   * 去到详情页
   */
  gotoDetail: function(event) {
    const { id } = event.currentTarget.dataset;
    const { tab_index, in_theaters, coming_soon, } = this.data;
    const currentList = tab_index === 1 ? in_theaters : coming_soon;
    const detail = currentList.find(item => item.id === id);
    console.log('detail', detail);
    wx.setStorageSync(id, detail);
    wx.navigateTo({
      url: `/pages/movie/detail/index?id=${id}`,
    })
  },
})