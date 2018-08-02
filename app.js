const config = require('/config.js');
//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      timeout: 10000,
      success: res => {
        wx.request({
          method: 'POST',
          dataType: 'json',
          url: `${config.api}/openid`,
          data: {
            code: res.code
          },
          success: (res) => {
            const { data: { openid, session_key } } = res;
            wx.setStorage({ key: 'openid', data: openid });
            wx.setStorage({ key: 'session_key', data: session_key});
          },
          fail: error => {
            console.log(error);
          }
        })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
      fail: error => {
        wx.showModal({
          title: '失败',
          content: error.errMsg,
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    // 获取本机支持的 SOTER 生物认证方式
    wx.checkIsSupportSoterAuthentication({
      success: res => {
        const { supportMode } = res;
        if (supportMode.length) {
          this.globalData.supportMode = supportMode;
        } else {
          console.log('本机不支持生物认证');
        }
      },
      fail: function(error) {
        console.log(error.errMsg);
      }
    });
    // 获取 access_token
    const getToken = function() {
      wx.request({
        method: 'GET',
        dataType: 'json',
        url: `${config.api}/token`,
        success: (res) => {
          const { data: { access_token } } = res;
          wx.setStorage({ key: 'access_token', data: access_token });
        },
        fail: error => {
          console.log(error);
        }
      })
    }
    const startGetToken = function() {
      getToken();
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        startGetToken();
      }, 1000 * 60 * 60 * 2);
    }
    startGetToken();
  },
  globalData: {
    userInfo: null,
    supportMode: [],
    city: '北京',
  },
})