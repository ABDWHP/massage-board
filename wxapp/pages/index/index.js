//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lang: {
    },
    slideButtons: [{
      type: 'default',
      text: '删除',
      extClass: 'test',
      src: '/image/del.svg', // icon的路径
    }, {
      type: 'default',
      text: '管理',
      extClass: 'test',
      src: '/image/tastik.svg', // icon的路径
    }, {
      type: 'default',
      text: '复制',
      extClass: 'test',
      src: '/image/copy.svg', // icon的路径
    }],
  },
  onLoad: function (options) {
    switch ('zh') {
      case 'zh':
        this.setData({
          lang: {
            lang:"zh",
            addBoard: '新建留言区',
            no: "取消",
            yes: "确定",
            alert: "警告",
            rushure: "确定删除吗？",
            cantback: "删除后无法恢复"
          },
        })
        break;
      case 'ug':
        this.setData({
          lang: {
            lang:"ug",
            addBoard: 'ئىنكاس رايۇنى قۇرۇش',
            no: "ياق",
            yes: "ھەئە",
            alert: "ئەسكەرتىش",
            rushure: "ئۆچۈرۈۋىتەمسىز؟",
            cantback: "ئۆچۈرىۋەتكەندىن كىيىن ئەسلىگە كەلمەيدۇ"
          },
        })
        break;
      case 'zh':

        break;

      default:
        break;
    }
    var that = this;
    if (!this.data.canIUse) {
      wx.getUserInfo({
        success: res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    login2(that)
  },
  slideButtonTap: function (e) {
    switch (e.detail.index) {
      case 0:
        this.setData({
          half: {
            show: true,
            id: e.currentTarget.dataset.id,
            user: e.currentTarget.dataset.creator,
            buttons: [{
                type: 'default',
                className: '',
                text: this.data.lang.no,
                value: 0
              },
              {
                type: 'warn',
                className: '',
                text: this.data.lang.yes,
                value: 1
              }
            ]
          },

        })
        break;
      case 1:
        wx.navigateTo({
          url: '/pages/inkas/inkas?id=' + e.currentTarget.dataset.id
        })
        break;
      case 2:
        wx.setClipboardData({
          data: '/pages/inkas/inkas?id=' + e.currentTarget.dataset.id,
        })
        break;

      default:
        break;
    }
  },
  getUserInfo: function (e) {
    console.log('login', e.detail.errMsg)
    if (e.detail.errMsg == "getUserInfo:ok") {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      let that = this
      login2(that)

    }
  },
  add: function () {

    wx.navigateTo({
      url: '/pages/add/add'
    })
  },
  board: function (e) {
    wx.navigateTo({
      url: '/pages/tastik/tastik?board=' + e.currentTarget.dataset.id
    })

  },help:function () {
    wx.navigateTo({
      url: '/pages/help/help',
    })
  },
  onShow: function () {
    if (wx.getStorageSync('openid')) {
      var that = this
      refresh(that)
    }
  },
  del: function (e) {
    console.log(e)
    if (e.detail.index == 1) {
      del_board(this.data.half.id, this.data.half.user, this)
    }
    this.setData({
      half: {
        show: false
      }
    })
  },
})

function refresh(that) {
  wx.request({
    url: app.data.domain+'my_board_list.php',
    data: {
      me: wx.getStorageSync('openid')
    },
    method: 'GET',
    success(res) {
      console.log(res.data)
      that.setData({
        list: res.data
      })
    }
  })
}

function login2(that) {
  wx.getSetting({
    success(res) {
      if (res.authSetting['scope.userInfo']) {
        wx.getUserInfo({
          success: function (res) {
            that.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
            wx.login({
              complete: (res) => {
                if (res.errMsg == 'login:ok') {
                  wx.request({
                    url: app.data.domain+'user.php',
                    data: {
                      code: res.code,
                      name: that.data.userInfo.nickName,
                      head: that.data.userInfo.avatarUrl
                    },
                    method: 'GET',
                    success(res) {
                      wx.setStorageSync('openid', res.data.id)
                      refresh(that)
                    }
                  })
                }
              },
            })
          }
        })
      }
    }
  })
}

function del_board(id, user, that) {
  wx.request({
    url: app.data.domain+'del_board.php',
    data: {
      id: id,
      user: user
    },
    method: 'GET',
    success: function (res) {
      if (res.data.code == 1) {
        wx.showToast({
          title: '已删除',
          icon: 'success',
          duration: 1000
        })
      } else {
        wx.showToast({
          title: '删除失败',
          icon: 'none'
        })
      }
      refresh(that)
    }
  })
}