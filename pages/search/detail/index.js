// pages/search/detail/index.js
const config = require('../../../config.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: 0,
    count: 20,
    total: -1,
    movies: [],
    keyword: '',
    title: '搜索中...',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { keyword } = options;
    this.setData({ keyword });
    this.search(keyword, true);
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
    const { keyword } = this.data;
    this.search(keyword);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  /**
   * 搜索
   */
  search: function(keyword, isFirst = false) {
    const { start, count, total, movies } = this.data;
    if ( total > -1 && start >= total ) {
      wx.showToast({ icon: 'nonde', title: '已经到底了...' });
      return;
    }
    wx.request({
      url: `${config.api}/movie`,
      data: {
        start,
        q: keyword,
      },
      complete: res => {
        console.log(res.data);
        const { start, total, title, subjects } = res.data;
        const formatSubjects = subjects.map(subject => {
          return {
            ...subject,
            average: subject.rating.average,
            genres: subject.genres.join(' '),
            thumbnail: subject.images.medium,
            cast: subject.casts.map(cast => cast.name).join(' '),
            director: subject.directors.map(cast => cast.name).join(' '),
          };
        });
        this.setData({
          title: title,
          total: total,
          start: start + count,
          movies: isFirst ? formatSubjects : movies.concat(formatSubjects),
        });
      }
    });
  },
  /**
   * 去到详情页
   */
  gotoDetail: function (event) {
    const { movies } = this.data;
    const { id } = event.currentTarget.dataset;
    const detail = movies.find(item => item.id === id);
    console.log('detail', detail);
    wx.setStorageSync(id, detail);
    wx.navigateTo({
      url: `/pages/movie/detail/index?id=${id}`,
    })
  },
})