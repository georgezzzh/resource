
var time=0;
var touchDot=0;
var touchMove=0;
var interval="";
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  
  data: {
    array: ["Other","Food","Cola", "淘宝","图书","交通","娱乐","通讯"],
    openid:"",
    expense:true,
    formData:{date:"",
    amount:"",
    category:"Food",
    otherInfo:"",
    },
    selectIndex:0
  }
  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      'formData.date': new Date().toLocaleDateString().replace(/\//g, "-"),
      'formData.amount' : "",
      selectIndex:0,
      'formData.otherInfo':""
    });
    var that=this;
    var openid=that.data.openid;
    //获取openid
    if (openid == "") {
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
                var o_id = response.data.openid;
                app.globalData.openid = o_id;
                that.setData({
                  openid:o_id
                });
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
  /*触控块的代码*/
  touchstart: function (e) {
    //console.log("start" + e.touches[0].pageX);
    interval = setInterval(function () {
      time++;
     },100);
     touchDot=e.touches[0].pageX;
     touchMove=touchDot;
  },
  touchmove: function (e) {
    //console.log("move xP= " + e.touches[0].pageX + " yp=" + e.touches[0].pageY);
    touchMove=e.touches[0].pageX;
  },
  touchend: function (e) {
    clearInterval(interval);
    var diff=touchMove-touchDot;
    //console.log("time="+time+";diff="+diff);
    if(time<10&&diff<-50){
      //console.log("手指从右往左滑动");
      this.setData({
        expense:false
      });
    }
    if(time<10&&diff>50){
      //console.log("手指从左往右滑动");
      this.setData({
        expense:true
      });
    }
    time = 0;
    touchMove = 0;
    touchDot = 0;
  },
  /*radio表单 */
  radioChange: function (e) {
    var value = e.detail.value;
    this.setData({
      'formData.category': value
    });
  },

/*表单块的代码 */
  change:function(e){
    this.setData({
      selectIndex: e.detail.value
    });
  },
  dateChange:function(e){
    this.setData({
     'formData.date':e.detail.value
    });
    console.log(this.data.formData);
  },
  submitForm:function(e){
    var category = this.data.array[parseInt(e.detail.value.selectIndex)];
    this.setData({
      'formData.amount': e.detail.value.amount,
      'formData.otherInfo': e.detail.value.otherInfo
    });
    //判断，如果是支出，category属性就填写详细内容，收入就填写其他,expense控制变量
    var expense=true;
    if(this.data.expense){
      //...
    }
    if(!this.data.expense){
      this.setData({
        'formData.category': "其他"
      });
      expense=false;

    }
    console.log(this.data.formData);
    var openid = getApp().globalData.openid;
    //console.log("openid:"+openid);
    wx.request({
      url: 'https://www.sonydafa.com/wechatApp/storeBill',
      method: 'POST',
      header: {
        "content-type": "application/x-www-form-urlencoded"
      },
      data: {
        "openid":openid,
        "bill_date":this.data.formData.date,
        "expense":expense?1:0,
        "amount": this.data.formData.amount,
        "category":this.data.formData.category,
        "remark":this.data.formData.otherInfo
      },
      success:function(response){
        console.log(response.data);
        //成功要提示用户，提交成功了
        if(response.data=="ok"){
          wx.showToast({
            title: '保存成功',
            icon: 'succes',
            duration: 500,
            mask: true
          });
          setTimeout(function(){
            wx.switchTab({
              url: '../index/index',
              success:function(e){
                var page=getCurrentPages().pop();
                page.onLoad();
              }
            });
          },750);
        }else{
          wx.showToast({
            title: '服务器异常',
            icon: 'none',
            duration: 800,
            mask: true
          });
        }
        
      }
    })
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