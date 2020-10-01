// pages/add/add.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    creat:'新建' ,
    placeholder1:'请输入文章标题',
    placeholder2:'请输入文章链接',
    board_name:''
  },
  board_name:function (e) {
    this.setData({
      board_name: e.detail.value
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  creat:function(){
    if (this.data.board_name.length>5) {
      
    wx.request({
      url: app.data.domain+'add_board.php',
      method:'GET',
      data:{
        c:wx.getStorageSync('openid'),
        n:this.data.board_name
      },success(res){
        if (res.data.code==1) {

          wx.navigateTo({
            url: 'added?id='+res.data.id,
          })

          
        }else{
          console.log('创建失败')
        }
      }
    })
  }else{
    wx.showToast({
      title: '标题过短',
      icon:'none',
      duration: 1000,
    })
  }
  }
})