// pages/write/write.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholder:'请输入留言内容',
    submit:'写留言',
text:'',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      board:options.board
    })
    var that=this;
    if (!this.data.canIUse){
      wx.getUserInfo({
        success: res => {
          that.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          wx.login({
            complete: (res) => {
              if (res.errMsg=='login:ok') {
                wx.request({
                  url: app.data.domain+'user.php',
                  data:{
                    code:res.code,
                    name:that.data.userInfo.nickName,
                    head:that.data.userInfo.avatarUrl
                  },
                  method:'GET',
                  success (res) {
                  wx.setStorageSync('openid', res.data.id)
                  }
                })

              }
            },
          })
        }
      })
    }
    wx.getSetting({
      success (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
              })
            }
          })
        }
      }
    })

  },
  getUserInfo: function(e) {
    if (e.detail.errMsg=="getUserInfo:ok") {
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
  submit:function(){
    if (this.data.text.length>0) {
      wx.request({
        url: app.data.domain+'add_c.php',
        data:{
          user:wx.getStorageSync('openid'),
          board:this.data.board,
          text:this.data.text,
          father:0
        },
        method:'GET',
        success:function (res) {
          if (res.data.code==1) {
            wx.showToast({
              title: 'ok'
            })
          } else {
            wx.showToast({
              title: res.data.res,
              icon:'none',
              duration:2000
            })
          }
          wx.navigateBack()
        }
      })
    } else {
      wx.showToast({
        title: '内容过少',
        icon:'none',
        duration: 1000,
      })
    }
  
  },
  write:function(e){
    this.setData({
      text: e.detail.value
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})