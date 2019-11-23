// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authority:false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    avatarUrl:""
  },
  /*小程序启动首先要拿到openId */
  onLoad: function (options) {

    //授权信息
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log("授权成功");
              console.log(res.userInfo)
            }
          })
        }else{
          console.log("授权失败");
        }
      }
  })
  },
  bindGetUserInfo(e) {
    console.log(e.detail.userInfo)
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