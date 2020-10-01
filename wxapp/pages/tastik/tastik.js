// pages/tastik/tastik.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    showActionsheet: false,
   

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      board:options.board
    })
    let that = this
    refresh(that)
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

    let that = this
    refresh(that)
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
  return: function () {
    wx.navigateTo({
      url: '/pages/return/return'
    })
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    switch (e.detail.value) {
      case 1:
        wx.request({
          url: app.data.domain+'com_action.php',
          data:{
            creator:wx.getStorageSync('openid'),
            board:this.data.board,
            id:this.data.actionid,
            action:'pass'
          },success:function (res) {
            console.log(res.data)
          }
        })
        break;
      case 2:
        wx.navigateTo({
          url: '/pages/return/return?board='+this.data.board+'&id='+this.data.actionid,
        })
        break;
      case 3:
        wx.request({
          url: app.data.domain+'com_action.php',
          data:{
            creator:wx.getStorageSync('openid'),
            board:this.data.board,
            id:this.data.actionid,
            action:'del'
          },success:function (res) {
          }
        })
        break;

      default:
        break;
    }

    let that = this
    refresh(that)

    this.close()
  },


  action: function (e) {
    var that = this;
    if (e.currentTarget.dataset.user!=wx.getStorageSync('openid')) {

    that.setData({
      groups: [{
        text: '通过',
        value: 1
      },
      {
        text: '回复',
        value: 2
      },
      {
        text: '删除',
        type: 'warn',
        value: 3
      }
    ],
    showActionsheet: true,
    actionid:e.currentTarget.dataset.id,
    actiionuser:e.currentTarget.dataset.user
    })
  }else{
    that.setData({
      groups: [{
        text: '删除',
        type: 'warn',
        value: 3
      }
    ],
    showActionsheet: true,
    actionid:e.currentTarget.dataset.id,
    actiionuser:e.currentTarget.dataset.user
    })
  }
  },

})
function refresh(that) {
  wx.request({
    url: app.data.domain+'board_tastik.php',
    data: {
      board: that.data.board,
      creator: wx.getStorageSync('openid')
    },
    method: 'GET',
    success: function (res) {
      that.setData({
        comlist: res.data
      })
    }
  })
}