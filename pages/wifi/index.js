// pages/wifi/index.js
Page({
  connectedWifi: {},
  /**
   * 页面的初始数据
   */
  data: {
    wifiList: [{
      'SSID': 'bianlifeng-gust',
      secure: true,
      signalStrength: 70,
      img: '/images/icons/wifi-mid.png'
    }, {'SSID': 'bianlifeng-staff',
      secure: true,
      connected: true,
      signalStrength: 99,
      img: '/images/icons/wifi-high.png'
    }, {
        'SSID': 'ChinaUnicom',
        secure: false,
        signalStrength: 30,
        img: '/images/icons/wifi-low.png'
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startWifi({
      complete: (res) => {
        if (res.errCode === 0) {
          this.getWifiList();
        } else {
          wx.showModal({
            title: '错误',
            content: res.errMsg,
          })
        }
      }
    });
    wx.getConnectedWifi({
      success: ({ wifi }) => {
        this.connectedWifi = wifi;
      }
    });
    wx.onGetWifiList(({ wifiList }) => {
      console.log('wifiList', this.uniq(wifiList));
      this.setData({ wifiList: this.uniq(wifiList).map(wifi => {
        if (wifi.signalStrength > 80) {
          wifi.img = '/images/icons/wifi-high.png';
        } else if (wifi.signalStrength > 60) {
          wifi.img = '/images/icons/wifi-mid.png';
        } else {
          wifi.img = '/images/icons/wifi-low.png';
        }
        return wifi;
      }) });
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
   * 获取WIFI列表
   */
  getWifiList: function() {
    wx.getWifiList({
      success: (res) => {
        console.log('wifiList2', res);
      },
      fail: error => {
        wx.showModal({
          title: '错误',
          content: error.errMsg,
        })
      }
    });
  },
  /**
   * 数组去重
   */
  uniq: function(list) {
    return list.reduce((prev, cur) => {
      if (prev.find(item => item.SSID === cur.SSID) || !cur.SSID) {
        return prev;
      } else {
        console.log('connectedWifi', this.connectedWifi);
        const { SSID } = this.connectedWifi;
        const wifi = SSID === cur.SSID ? {...cur, connected: true} : cur;
        return [...prev, wifi];
      }
    }, []);
  },
  /**
   * 连接WIFI
   */
  connectWifi: function(event) {
    const { wifi } = event.currentTarget.dataset;
    if (wifi.secure) {
      wx.connectWifi({
        SSID: wifi.SSID,
        BSSID: wifi.BSSID,
        password: 'bianlifeng!~',
        complete: (res) => {
          if (res.errCode !== 0) {
            wx.showModal({
              title: '失败',
              showCancel: false,
              content: res.errMsg,
            })
          }
        }
      })
    } else {
      wx.connectWifi({
        SSID: wifi.SSID,
        BSSID: wifi.BSSID,
        password: '',
        complete: (res) => {
          if (res.errCode !== 0) {
            wx.showModal({
              title: '失败', 
              showCancel: false,
              content: res.errMsg,
            })
          }
        }
      })
    }
  },
})