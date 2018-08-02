const play_img = '/images/icons/play.png';
const stop_img = '/images/icons/stop.png';
const amapFile = require('../../libs/amap-wx.js');
const config = require('../../config.js'); 
const app = getApp();
const minScale = 5;
const maxScale = 18;
let brightness = 0.5;
wx.getScreenBrightness({
  success: (res) => {
    brightness = res.value;
  }
});

Page({
  /**
   * 页面的初始数据
   */
  mapContext: null,
  data: {
    url: '',
    map: {
      scale: 16,
    },
    movies: null,
    weather: null,
    scene_list: undefined,
    in_theaters: [],
    controls: {
      position: {
        top: 10,
        left: 10,
      }
    },
    payViewVisible: false,
    playerBtn: play_img,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({ title: '加载中...' });
    // 定位当前位置
    this.getCurrentLocation();
    // 获取电影信息
    this.getMovieList();
    // 获取景点信息
    this.getJingdian({});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapContext = wx.createMapContext('map');
    this.mapContext.getScale({
      success: function(res) {
        
      }
    });
    this.playing = false;
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.autoplay = false;
    this.innerAudioContext.loop = true;
    this.innerAudioContext.src = 'http://211.136.65.146/cache/fs.w.kugou.com/201806251901/9799ae9bfc335b9b1a76b0fc9442648d/G125/M01/00/1F/HYcBAFrByXCATVNeACpLIMUIOec727.mp3?ich_args2=112-25193104006881_31f534e9053017df9da986f34f4fc1a5_10095002_9c896625dec1f7d39e3f518939a83798_c99a730525f79fea74ac7f3a68ea1fa4';
    // NFC
    wx.getHCEState({
      success: (res) => {
        console.log(res);
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ url: '' });
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
    const { pn = 1 } = this.data;
    this.getJingdian({ pn });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  /**
   * 跳转到通知列表页
   */
  gotoNotifyList: function() {
    wx.navigateTo({
      url: '/pages/notify/index'
    });
  },
  /**
   * 扫一扫
   */
  scanCode: function() {
    const that = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode', 'barCode'],
      success: function(res) {
        console.log(res);
        const { result, scanType, path } = res;
        // 二维码
        if (scanType === 'QR_CODE') {
          if (/^https?:\/\//.test(result)) {
            that.setData({
              url: result
            });
          } else if (path) {
            wx.navigateTo({
              url: `/${path}`,
            });
          }
        }
        
        // 条形码
        if (scanType === 'CODE_128') {
          if (/\d{12,13}/.test(result)) {
            wx.redirectTo({
              url: `/pages/tools/wuliu/index?code=${result}`,
            });
          }
        }
      }
    });
  },
  /**
   * 地图定位
   */
  locate: function() {
    this.mapContext.moveToLocation();
  },
  /**
   * 地图放大
   */
  enlarge: function() {
    const { map } = this.data;
    const { scale = 16 } = map;
    if (maxScale > scale) {
      this.setData({map: {
        ...map,
        scale: scale + 1
      }});
    }
  },
  /**
   * 地图缩小
   */
  shrink: function () {
    const { map } = this.data;
    const { scale = 16 } = map;
    if (minScale < scale) {
      this.setData({
        map: {
          ...map,
          scale: scale - 1
        }
      });
    }
  },
  /**
   * 长按关闭web-view
   */
  longpress: function () {
    this.setData({url: ''});
  },
  payTap: function() {
    wx.navigateTo({
      url: '/pages/paycode/index',
    })
  },
  /**
   * 世界杯
   */
  gotoFootball: function() {
    wx.navigateTo({
      url: '/pages/video/list/index',
    });
  },
  /**
   * 点击播放器按钮
   */
  playTap: function() {
    if (this.playing) {
      this.innerAudioContext.stop();
      this.setData({ playerBtn: play_img });
    } else {
      this.innerAudioContext.play();
      this.setData({ playerBtn: stop_img });
    }
    this.playing = !this.playing;
  },
  /**
   * 手机震动
   */
  onVibrate() {
    wx.vibrateLong({});
  },
  gotoMobile() {
    wx.navigateTo({
      url: '/pages/tools/mobile/index',
    })
  },
  setWifi() {
    wx.navigateTo({
      url: '/pages/wifi/index',
    })
  },
  /**
   * 
   */
  gotoWeather() {
    wx.navigateTo({
      url: '/pages/tools/weather/index',
    })
  },
  /**
   * 
   */
  gotoWuliu() {
    wx.navigateTo({
      url: '/pages/tools/wuliu/index',
    })
  },
  /**
   * gotoCardID
   */
  gotoCardID() {
    wx.navigateTo({
      url: '/pages/tools/cardID/index',
    })
  },
  /**
   * 获取当前位置
   */
  getCurrentLocation() {
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
          const { map } = this.data;
          const cityName = city.length ? city[0] : province;
          const region = [province, cityName, district];
          app.globalData.city = cityName;
          this.getWeather(cityName);
          this.setData({
            map: {
              ...map,
              latitude,
              longitude,
            },
            citycode,
            region,
          });
        }
      },
      fail: () => {
        wx.hideLoading();
      }
    });
  },
  /**
   * 查询天气
   */
  getWeather(city) {
    wx.request({
      url: `${config.api}/weather`,
      data: {
        city,
        path: 'query',
      },
      complete: res => {
        wx.hideLoading();
        const { result } = res.data;
        if (result) {
          this.setData({
            weather: {
              ...result, daily: result.daily.map(item => {
                return {
                  ...item,
                  date: item.date.slice(-1),
                  week: item.week.slice(-1)
                };
              })
            },
          });
        }
      }
    })
  },
  /**
   * 获取电影列表
   */
  getMovieList(city = '北京') {
    wx.request({
      data: {
        city,
        path: 'in_theaters',
      },
      url: `${config.api}/movie`,
      success: res => {
        const { subjects = [] } = res.data;
        if (subjects.length) {
          const movies = subjects.slice(0, 10);
          this.setData({
            movies: movies.map(movie => {
              return {
                id: movie.id,
                title: movie.title,
                img: movie.images.large,
              };
            }),
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
        }
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  /**
   * 去到电影详情页
   */
  gotoDetail: function (event) {
    const { id } = event.currentTarget.dataset;
    const { in_theaters } = this.data;
    const detail = in_theaters.find(item => item.id === id);
    wx.setStorageSync(id, detail);
    wx.navigateTo({
      url: `/pages/movie/detail/index?id=${id}`,
    })
  },
  /**
   * 搜索
   */
  comfirm: function(event) {
    const { value } = event.detail;
    wx.navigateTo({
      url: `/pages/search/detail/index?keyword=${value}`,
    });
  },
  /**
   * 获取景点
   */
  getJingdian({ surl = '北京', pn = 1 }) {
    wx.request({
      data: {
        pn,
        surl,
      },
      url: `${config.api}/jingdian/list`,
      complete: res => {
        const { data } = res;
        const { scene_list = [] } = this.data;
        if (data && data.length) {
          this.setData({
            pn: pn + 1,
            scene_list: scene_list.concat(data.map(item => {
              const newItem = {
                ...item,
                cover: {
                  ...item.cover,
                  full_url: item.cover.full_url.replace('hiphotos.baidu', 'img.html5shanbo'),
                }
              };
              return newItem;
            })),
          });
        }
      }
    })
  },
  /**
   * 景点详情
   */
  sceneDetail: function(event) {
    const { sid, surl } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/tools/jingdian/index?sid=${sid}&surl=${surl}`,
    });
  },
  /**
   * gotoAnwser
   */
  gotoAnwser: function() {
    wx.navigateTo({
      url: `/pages/tools/answer/index`,
    });
  },
  /**
   * 火车票
   */
  gotoTrain: function() {
    wx.navigateTo({
      url: `/pages/tools/train/index`,
    });
  }
})