// pages/mine/index.js
const app = getApp();
const currentIndex = 4;
const duration = 5 * 60 * 1000;
const genders = ['未知', '男', '女'];
const config = require('../../config.js');
const util = require('../../utils/util.js');
const temp = require('../../components/list/index.js');

Page({
  /**
   * 页面的初始数据
   */
  startTime: 0,
  data: {
    gender: '',
    nickName: '',
    avatarUrl: '',
    list: [ {
      title: '设置',
      type: 'settings',
      img: '/images/icons/settings.png',
    }],
    systemInfo: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this;
    const { globalData: { userInfo = {} } } = app;
    const { nickName, avatarUrl, gender } = userInfo;
    this.setData({
      nickName,
      avatarUrl,
      gender: genders[gender],
    });
    wx.getSystemInfo({
      success: function(res) {
        const systemInfo = [{
          key: '手机品牌',
          value: res.brand
        }, {
          key: '手机型号',
          value: res.model
        }, {
          key: '微信版本号',
          value: res.version,
        }, {
          key: '客户端平台',
          value: res.platform,
        }];
        that.setData({ systemInfo });
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.getWeRunData({
      timeout: 3000,
      success: (res) => {
        const { encryptedData, iv } = res;
        const sessionKey = wx.getStorageSync('session_key');
        console.log('sessionKey', sessionKey);
        wx.request({
          method: 'POST',
          url: `${config.api}/decrypt`,
          data: {
            iv,
            sessionKey,
            encryptedData,
          },
          success: (res) => {
            const { data: { stepInfoList = [] } } = res;
            const step = (stepInfoList.pop() || {}).step || 0;
            this.setData({
              list: this.data.list.concat([{
                  title: '计步',
                  content: `${step}步`,
                  img: '/images/icons/footmark.png',
              }]),
            });
          }
        })
      }
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
   * 切换头像
   */
  avatarClick() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success:(res) => {
        const { tempFilePaths } = res;
        if (tempFilePaths.length) {
          wx.showLoading({
            title: 'loading...',
          })
          const access_token = wx.getStorageSync('access_token');
          wx.uploadFile({
            name: 'media',
            filePath: tempFilePaths[0],
            url: `${config.api}/check_image`,
            success: ({ data, statusCode }) => {
              const data_json = JSON.parse(data);
              if (data_json.errcode === 0) {
                util.saveFile({
                  tempFilePath: tempFilePaths[0],
                  success: (res) => {
                    const { savedFilePath } = res;
                    this.setData({
                      avatarUrl: savedFilePath,
                    });
                  }
                });
              } else {
                wx.showModal({
                  title: '错误',
                  content: '内容含有违法违规内容',
                })
              }
            },
            complete: () => {
              wx.hideLoading();
            }
          })
        }
      },
      fail: function(error) {
        console.log(error);
      }
    });
  },
  onTabItemTap: function(item) {
    // const { index = 0 } = item;
    // if (index === currentIndex) {
    //   if (Date.now() - this.startTime > duration) {
    //     this.startTime = Date.now();
    //     wx.startSoterAuthentication({
    //       challenge: 'mine',
    //       authContent: '请验证身份',
    //       requestAuthModes: app.globalData.supportMode,
    //       success: (res) => {
    //         console.log(res);
    //       },
    //       fail: (error) => {
    //         this.startTime = 0;
    //         wx.switchTab({
    //           url: '/pages/home/index'
    //         });
    //       }
    //     });
    //   }
    // }
  },
  /**
   * 打电话
   */
  callme: function() {
    wx.makePhoneCall({
      phoneNumber: '13439915168',
      success: function() {

      },
      fail: function() {
        wx.showModal({
          title: '失败',
          content: '服务忙，请稍后再拨',
        })
      }
    });
  },
  itemTap: function(event) {
    temp.tap(event);
  }
})