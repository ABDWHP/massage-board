// pages/language/language.js
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

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  select: function (e) {
    console.log(e)
    wx.setStorageSync('lang', e.currentTarget.dataset.lang)
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
})