// pages/checkoutDetail/checkoutDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    whoamI:"",
    deal_id:"",
    openid:"",
    obj:""
  },
  submitForm:function(e){
    var that=this;
    wx.showModal({
      title: '提示',
      content: '确定要删除吗？',
      success: function (sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          //console.log("可以删除了");
          wx.request({
            url: 'https://www.sonydafa.com/wechatApp/deleteCheckout',
            method:"GET",
            data:{
              "openid":that.data.openid,
              "deal_id":that.data.deal_id
            },
            success: function (response) {
              //成功要提示用户，提交成功了
              if (response.data.status == "ok") {
                wx.showToast({
                  title: '删除成功',
                  icon: 'succes',
                  duration: 500,
                  mask: true
                });
                
                setTimeout(function(){
                  /*
                  wx.redirectTo({
                    url: '../today/today?whoamI='+that.data.whoamI
                  });
                  */
                  let pages = getCurrentPages();
                  let prevPage = pages[pages.length - 2];
                  let info=pages[pages.length-1].data.whoamI;
                  prevPage.setData({
                    whoamI: info
                  })
                  wx.navigateBack({
                    delta: 1,
                  });

                }, 300);
              } else {
                wx.showToast({
                  title: '服务器异常,删除失败',
                  icon: 'none',
                  duration: 800,
                  mask: true
                });
              }
            }
          });
        } else if (sm.cancel) {
          console.log('用户点击取消删除')
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    var app = getApp();
    var deal_id=options.deal_id;
    var whoamI=options.whoamI;
    this.setData({
      deal_id:deal_id,
      openid: app.globalData.openid,
      whoamI:whoamI
    });
    wx.request({
      url: 'https://www.sonydafa.com/wechatApp/checkoutDetail',
      method: 'GET',
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data: {
        "deal_id":deal_id,
        "openid": this.data.openid,
      },
      success: function (response) {
        var data = response.data;
        that.setData({
          obj: response.data
        });
        var amount_format="";
        if(data.expense){
          amount_format="-￥"+data.amount;
        }else
          amount_format="+￥"+Math.abs(data.amount);
        that.setData({
          'obj.amount':amount_format
        });
      }
    });

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