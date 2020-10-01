// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.setData({
  id:options.board
})
  },
  getUserInfo: function (e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      
      let that = this
      login2(that)

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

  }
})

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
                      wx.navigateTo({
                        url: '/pages/inkas/inkas?id='+that.data.id,
                      })
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