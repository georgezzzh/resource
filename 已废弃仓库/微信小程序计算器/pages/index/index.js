//index.js
//获取应用实例

var util=require("../../utils/util.js");
//具体的计算模块
var calculate=require("../index/calculate.js");
Page({
 data:{
   count:0,
   border: "solid 1px #000", 
   currentInput:"",
   lt:"<-",
   totalInput:"",
   bin_str:"",
   bin_full_str:"",
   hex_str:"",
   hex_full_str:"",
   answer:"",
   hexStyle:"display:none;",
   binStyle: "display:none;",
   decStyle:"display:view",
   numberMode:"dec"
 }
,
onLoad:function(){

},
fulldisplay:function(e){
  var char=e.target.id;
  console.log(char);
  var info="";
  switch(char){
    case "bin":
      info=this.data.bin_full_str;
      break;
    case "hex":
      info=this.data.hex_full_str;
      break;
    case "ans":
      info=this.data.answer  
  }
  wx.navigateTo({
    url: '/pages/result/result?text='+info,
  });
},
programMode:function(e){
  //切换进制，清除所有内容
  this.setData({totalInput: "",bin_str: "",bin_full_str: "",hex_str: "",hex_full_str: "", answer: "",});
  var mode=e.target.id;
  this.setData({numberMode:mode});
  switch(mode){
    case "dec":
      this.setData({ hexStyle: "display:none", binStyle: "display:none",decStyle:"display:view" });
      break;
    case "hex":
      this.setData({ hexStyle: "display:view",binStyle:"display:none",decStyle:"display:none" });
      break;
    case "bin":
      this.setData({ hexStyle: "display:none", binStyle: "display:view" ,decStyle:"display:none"});
      break;
  }
 
},
//十六进制和二进制显示
number_input: function (str) {

  var bin_temp_str = parseFloat(str).toString(2);
  var hex_temp_str = parseFloat(str).toString(16);

  //console.log("dec_bin_hex_:"+str+"\t"+bin_temp_str + "\t" + hex_temp_str)
  if (isNaN(bin_temp_str)){
    bin_temp_str=""; hex_temp_str="";
  }else{
    this.setData({bin_full_str:bin_temp_str,hex_full_str:hex_temp_str});
  } 

  //只保留小数点后四位
  if (bin_temp_str.match(/\./g)) {
    bin_temp_str = bin_temp_str.match(/.*\..{0,4}/)[0];
    hex_temp_str = hex_temp_str.match(/.*\..{0,4}/)[0];
  }
  if(bin_temp_str.length>15) bin_temp_str=bin_temp_str.substr(0,14)+"...";
  if(hex_temp_str.length>15) hex_temp_str=hex_temp_str.substr(0,14)+"...";

  this.setData({ bin_str: bin_temp_str, hex_str: hex_temp_str });
},
//运行计算的主控程序
cal: function (e) {
    var char = e.target.id;
    switch(char){
      case "clear":
        this.setData({ totalInput: "", answer: "", bin_str: "", hex_str: "" })
        break;
      case "del":
        var str = this.data.totalInput;
        var len = this.data.totalInput.length;
        var newTotalInput = str.substring(0, str.length - 1);
        this.setData({  totalInput: newTotalInput });
        //在给出答案之后清空答案区域
        //if (this.data.answer != "")
        //    this.setData({answer: ""})
        char="";
      default:
        var newTotalInput = this.data.totalInput + char;
        this.setData({  totalInput: newTotalInput });
        var str = this.data.totalInput + "=";
        if (!calculate.bracketMatch(str)){
          this.setData({ answer: "Parentheses do not match..." });
          break;
        }
        var result = calculate.compute(this.data.numberMode,str);
        if (isNaN(result)){
          this.setData({ answer: "Bad Expression" });
          break;
        }
        this.setData({ answer: result });
        this.number_input(result);  
    }
}

})
var app=getApp();
