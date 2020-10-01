// pages/return/return.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    return:'回复',
    placeholder:'请输入回复内容'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.setData({
  board:options.board,
  id:options.id
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
  rettext:function (e) {
    this.setData({
      text: e.detail.value
      })
  },
  submit:function(){
    if (this.data.text.length>0) {
      wx.request({
        url: app.data.domain+'add_c.php',
        data:{
          user:wx.getStorageSync('openid'),
          board:this.data.board,
          text:this.data.text,
          father:this.data.id
        },
        method:'GET',
        success:function (res) {
          console.log(res.data)
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
})