// pages/today/today.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid:"",
    statisticsInfo:{
      count:0,
      totalExpense:0,
      totalIncome:0,
      totalBalance:0
    },
    /**
     * obj是存放所有交易明细的对象
     * sumObj是存放统计信息的对象
     * target是标识页面来自于何处
     */
    obj:"",
    sumObj:"",
    whoamI:"day"//默认为天
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
    //var options = this.data.whoamI;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var options=new Object();
    options.whoamI = currPage.data.whoamI;
    this.onLoad(options);
  },
  onLoad: function (options) {
    //设置页面的openid
    var app=getApp();
    var target = options.whoamI;
    this.setData({
      openid: app.globalData.openid,
      whoamI:target
    });
    //向数据库发送获取详情列表
   
    var that=this;
    wx.request({
      url: 'https://www.sonydafa.com/wechatApp/getRangeData',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        "range": target,
        "openid":this.data.openid
      },
      success:function(response){
        var data=response.data;
        that.setData({
          obj:response.data
        });
      }
    });
    //获取range统计信息
    wx.request({
      url: 'https://www.sonydafa.com/wechatApp/home',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        "openid": this.data.openid
      },
      success: function (response) {
        var data = response.data.range;
        var currentTargetObj=new Object();
        switch(target){
          case "day":
            currentTargetObj=data.todayTotalAmount;
            break;
          case "week":
            currentTargetObj=data.weekTotalAmount;
            break;
          case "month":
            currentTargetObj=data.monthTotalAmount;
            break;
          case "year":
            currentTargetObj=data.yearTotalAmount;
            break;  
        }
        that.setData({
          sumObj:currentTargetObj
        });
      }
    });
  },
  //查看单条记录
  checkoutDetail:function(e){
    var deal_id=e.currentTarget.id;
    var url ="../checkoutDetail/checkoutDetail?whoamI="+this.data.whoamI+"&deal_id="+deal_id;
    wx.navigateTo({
      url: url
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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