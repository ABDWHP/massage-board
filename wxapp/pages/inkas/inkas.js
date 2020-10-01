// pages/comment/comment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lang: {
      lang:"zh",
      bestComment: '精选留言',
      write: '写留言',
    },
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    if (!wx.getStorageSync('openid')) {
      wx.redirectTo({
        url: '/pages/login/login?board='+options.id
      })
    }
     switch (options.lang) {
       case 'ug':
         this.setData({
          lang: {
            lang:"ug",
            bestComment: 'تاللانغان ئىنكاسلار',
            write: 'ئىنكاس يازاي',
          },
         })
         break;
       default:
         break;
     }
 
    this.setData({
      board:options.id
    })
    let that=this
    refresh(that)
  },
  add:function(){
    wx.navigateTo({
      url: '/pages/write/write?board='+this.data.board
    })
  },
  like: function (e) {
  
    var fuck=e.currentTarget.dataset;
    if (e.currentTarget.dataset.flag==0) {
      var action='like'
      var addlike=1
      var flag2=1
    }else{
      var action='dislike'
      var addlike=-1
      var flag2=0
    }
    var that=this
    wx.request({
      url: app.data.domain+'zan.php',
      data:{
        board:this.data.board,
        user:wx.getStorageSync('openid'),
        c:e.currentTarget.dataset.c,
        action:action
      },success:function (res) {
        console.log(that.data.boardinfo)
        console.log(fuck)
        if (fuck.cell>=0) {
          var upcount = "boardinfo.list[" + fuck.index + "].feedback["+fuck.cell+"].like.count"
          var upflag = "boardinfo.list[" + fuck.index + "].feedback["+fuck.cell+"].like.flag"
        }else{
          var upcount = "boardinfo.list[" + fuck.index + "].like.count"
          var upflag = "boardinfo.list[" + fuck.index + "].like.flag"

        }
        var res=fuck.count+addlike
        
        that.setData({
          [upcount]:res,
          [upflag]:flag2
        })
      }
    })
 
      },
  onShareAppMessage: function () {

  },
  onShow:function () {
    let that=this
    refresh(that)
  }
})
function refresh(that) {
  wx.request({
    url: app.data.domain+'board_info.php',
    data:{
      board:that.data.board,
      user:wx.getStorageSync('openid')
    },
    method:'GET',
    success:function (res) {
      console.log(res.data)
      that.setData({
        boardinfo:res.data
      })
    }
  })
}