//index.js
//获取应用实例
//需要考虑查询结果为空怎么办
const app = getApp()
var openid = app.globalData.openid
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    today:{
      category:"",
      amount:"还没有记录",
      create_time:"",
      expense:new Date().getHours()+":"+new Date().getMinutes()
    },
    /**统计日期数据 */
    calender:{
      today:"",
      firstDayOfWeek:"￥0",
      lastDayOfWeek:"￥0",
      firstDatOfMonth:"￥0",
      lastDayOfMonth:"￥0",
      firstDayOfYear:"￥0",
      lastDayOfYear:"￥0"
    },
    /*统计金额数字 */
    dayMonthYearData:{
      day:"",
      week:"",
      month:"",
      year:""
    },
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
/**
 * 导航的函数
 */
navToToday:function(){
  wx.navigateTo({
    url: '../today/today?whoamI=day'
  })
},
navToWeek:function(){
  wx.navigateTo({
    url: '../today/today?whoamI=week'
  })
},
navToMonth: function () {
  wx.navigateTo({
    url: '../today/today?whoamI=month'
  })
},
navToYear: function () {
  wx.navigateTo({
    url: '../today/today?whoamI=year'
  })
},
  /**
   * 格式化显示方式的函数
   */
  getFormatDay: function (date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return m + "月" + d + "日";
  },
  getFormatTime: function (date) {
    return date.getHours() + ":" + date.getMinutes();
  },
  /**
   * 显示首页所有数据的函数
   */
  getIndexData: function () {
    var that=this;
    wx.showNavigationBarLoading() //在标题栏中显示加载
    wx.request({
      url: 'https://www.sonydafa.com/wechatApp/home',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
      },
      data: {
        "openid": app.globalData.openid
      },
      success: function (response) {
        var today=response.data.today;
        var range=response.data.range;
        //单独设置today.expense参数
        if (today.amount == "NotExist") {
          that.setData({
            'today.expense': that.getFormatTime(new Date())
          });
        }else{
          that.setData({
            'today.expense': today.expense=="true" ? "支出" : "收入"
          });
        }
        that.setData({
          'today.category':today.category,
          'today.amount':today.amount,
          'today.create_time':today.create_time,
          'dayMonthYearData.day':range.todayTotalAmount.totalSum,
          'dayMonthYearData.week': range.weekTotalAmount.totalSum,
          'dayMonthYearData.month': range.monthTotalAmount.totalSum,
          'dayMonthYearData.year': range.yearTotalAmount.totalSum
        });

      },
      complete: function () {
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
      }
    })
  },
  /**
   * 首页加载函数
   * 存储用户的open_id
   */
  onLoad:function(){
    /**
     * 显示正在加载通知消息
     */
    wx.showLoading({
      title: 'Loading...',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 800)
    var that = this;
    //初始化日期信息
    var today=new Date();
    var firstDayOfWeek = new Date();
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() -firstDayOfWeek.getDay());
    var lastDayOfWeek = new Date();
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6 - lastDayOfWeek.getDay());
    //当月第一天
    var firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    var lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    var firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    var lastDayOfYear = new Date(today.getFullYear(), 11, 31);
    this.setData({
      'calender.today':that.getFormatDay(today),
      'calender.firstDayOfWeek':that.getFormatDay(firstDayOfWeek),
      'calender.lastDayOfWeek':that.getFormatDay(lastDayOfWeek),
      'calender.firstDayOfMonth':that.getFormatDay(firstDayOfMonth),
      'calender.lastDayOfMonth':that.getFormatDay(lastDayOfMonth),
      'calender.firstDayOfYear':that.getFormatDay(firstDayOfYear),
      'calender.lastDayOfYear':that.getFormatDay(lastDayOfYear)
    });
    //存储用户openid
    if(openid==""){
        wx.login({
          success: function (res) {
            wx.request({
              url: 'https://www.sonydafa.com/wechatApp/getOpenId',
              method: 'POST',
              header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              data: {
                "code": res.code
              },
              success: function (response) {
                var valid = response.data.valid;
                if (valid == "true") {
                  var openid = response.data.openid;
                  app.globalData.openid = openid;
                  that.getIndexData(openid);
                }
                if (valid == "false") {
                  console.log("获取openid出错");
                }
              }
            })
          }
        });
    }
  },
  /**
   * 其他的页面绑定函数
   */
  onReachBottom:function(){
    console.log("这里已经是底线了呢");
  },
  onPullDownRefresh:function(){
    //console.log("下拉刷新");
    this.getIndexData();
  },
  //分享功能
  onShareAppMessage: function () {
    return {
      title: 'EasyCheck',
      desc: '一个简单的记账本呢:-)',
      path: '/page/add'
    }
  }

})
