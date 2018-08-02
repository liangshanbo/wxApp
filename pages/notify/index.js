// pages/notify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height: 0,
    list: [{
        id: 1,
        icon: '/images/home/yuyibao.png',
        from: '蚂蚁财富～我的余额宝',
        title: '+9.05',
        content: '06-20余额宝收益',
        dateTime: '2018-06-21 11:56:20',
    }, {
      id: 2,
      icon: '/images/home/yuyibao.png',
      from: '蚂蚁庄园',
      title: '没有你的日子好无聊',
      content: '小鸡在19:42离开',
      dateTime: '2018-06-20 11:56:20',
      }, {
        id: 3,
        icon: '/images/home/yuyibao.png',
        from: '支付助手',
        title: '¥12345.96',
        content: '还款到账成功,信用卡还款',
        dateTime: '2018-06-21 11:56:20',
    }, {
      id: 4,
      icon: '/images/home/yuyibao.png',
      from: '蚂蚁财富～我的余额宝',
      title: '+9.05',
      content: '06-20余额宝收益',
      dateTime: '2018-06-21 11:56:20',
    }, {
      id: 5,
      icon: '/images/home/yuyibao.png',
      from: '蚂蚁庄园',
      title: '没有你的日子好无聊',
      content: '小鸡在19:42离开',
      dateTime: '2018-06-20 11:56:20',
    }, {
      id: 6,
      icon: '/images/home/yuyibao.png',
      from: '支付助手',
      title: '¥12345.96',
      content: '还款到账成功,信用卡还款',
      dateTime: '2018-06-21 11:56:20',
    }, {
      id: 7,
      icon: '/images/home/yuyibao.png',
      from: '蚂蚁财富～我的余额宝',
      title: '+9.05',
      content: '06-20余额宝收益',
      dateTime: '2018-06-21 11:56:20',
    }, {
      id: 8,
      icon: '/images/home/yuyibao.png',
      from: '蚂蚁庄园',
      title: '没有你的日子好无聊',
      content: '小鸡在19:42离开',
      dateTime: '2018-06-20 11:56:20',
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { windowHeight, pixelRatio } = wx.getSystemInfoSync();
    const height = Math.floor(windowHeight - 16 / pixelRatio);
    this.setData({
      height: `${height}px`
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
   * 返回
   */
  back: function() {
    wx.navigateBack();
  }
})