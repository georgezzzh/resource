module.exports={
  getOuterPriority: getOuterPriority,
  getInnerPriority: getInnerPriority,
  textNumberProcess: textNumberProcess,
  isDigit: isDigit,
  process:process,
  compute: compute,
  bracketMatch: bracketMatch
}
let mode="";
function bracketMatch(str) {
  var bracket = new Array();
  for (var i = 0; i < str.length; i++) {
    if (str[i] == "(")
      bracket.push("(");
    else if (str[i] == ")") {
      if (bracket.length < 1)
        return false;
      else
        bracket.pop();
    }
  }
  if (bracket.length > 0)
    return false;
  else
    return true;
}

function compute(numberMode,str) {
  mode=numberMode;
  //处理真正的计算
  var numstr = "";
  var numArray = new Array();
  var symbolArray = new Array();
  var tempNum = "";
  //标记上一次处理的字符是数字还是运算符号
  var lastNumFlag = false;
  //标记数字是正数还是负数
  var positiveORnegative = true;
  for (var i = 0, len = str.length; i < len; i++) {
    //console.log("第" + i + "次执行" + str[i]);
    //处理数字,并判断正负号
    if (this.isDigit(str[i])) {
      if (!positiveORnegative)
        tempNum += "-";
      tempNum += str[i];
      lastNumFlag = true;
      continue;
    }
    //处理符号
    else {
      if (lastNumFlag)
        this.textNumberProcess(tempNum, numArray, symbolArray);
      tempNum = "";
      lastNumFlag = false;
      //等于号
    
      if (str[i] == "=") {
        //把等于号先去掉
        while (symbolArray.length > 0) {
          this.process(symbolArray.pop(), numArray);
        }
      }
    
      //右括号，开始计算
      else if (str[i] == ")") {
        var operator = "";
        while ((operator = symbolArray.pop()) != "(")
          this.process(operator, numArray);
      }
      //其他符号
      else {
        //标记数字的正负号
        if (str[i] == '+' || str[i] == '-') {
          if (str[i] == '+')
            positiveORnegative = true;
          else if (str[i] == "-" && i == 0)
            positiveORnegative = false;
          //符号并且前一个字符也是符号
          else if (str[i] == "-" && !(this.isDigit(str[i - 1])) && str[i - 1] != ")" && str[i - 1] != "%")
            positiveORnegative = false;
          else
            positiveORnegative = true;
          if (str[i] == "+" && i == 0)
            continue;
          if (str[i] == "+" && !(this.isDigit(str[i - 1])) && str[i - 1] != ")" && str[i - 1] != "%")
            continue;
        }
        //负号就取消压入操作符堆栈
        if (!positiveORnegative)
          continue;
        //%号判断
        if (str[i] == "%" && numArray.length > 0) {
          numArray.push(0.01);
          symbolArray.push('×');
          continue;
        }

        var innerOperator = "";
        if (symbolArray.length > 0)
          innerOperator = symbolArray[symbolArray.length - 1];
        if (this.getOuterPriority(str[i]) > this.getInnerPriority(innerOperator)) {
          symbolArray.push(str[i]);
        }
        else {
          //要小于等于。。。
          while ((this.getOuterPriority(str[i]) <= this.getInnerPriority(innerOperator))
            && (symbolArray.length > 0)) {
            //弹出运算符，计算数值
            var innerOperator = symbolArray.pop();
            this.process(innerOperator, numArray);
          }
          symbolArray.push(str[i]);
        }
      }

    }
  }
  
  console.log("数字堆栈");
  console.log(numArray);
  console.log("符号堆栈");
  console.log(symbolArray);

  return numArray[0];
  /*
  if(numArray.length==0) return "";
  var sum = 1;
  for (var i = 0; i < numArray.length; i++)
    sum *= numArray[i];
  return sum;
  */
}

function process(operator, numArray) {
  var num1 = numArray.pop();
  var num2 = numArray.pop();
  var result = 0.0;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num2 - num1;
      break;
    case "×":
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case "÷":
      result = num2 / num1;
      break;
    case "^":
      if(mode=="hex"||mode=="bin")
        result = num1 ^ num2;
      else
        result = Math.pow(num2, num1);
      break;   
    case "&":
      result=num1&num2;
      break;
    case "|":
      result=num1|num2;
      break;   
    default:
      result = NaN;
  }
  console.log("中间计算" + num2 + operator + num1 + "=" + result);
  numArray.push(result);
}

function isDigit(char) {

  switch(mode){
    case "hex":
      return ("0" <= char && char <= "9" || "a" <= char && char <= "f"||char==".");
    case "dec":
      return "0" <= char && char <= "9" || char == "e" || char == "π" || char == '.'
    case "bin":
      return char=="0"||char=="1"||char==".";
    default:
      return false;
  }  
  /*
  if ("0" <= char && char <= "9" || char == "e" || char == "π" || char == '.')
    return true;
  else
    return false;
  */
}
function getOuterPriority(char) {
  switch (char) {
    case "+":
    case "-":
      return 0;
    case "×":
    case "÷":
      return 1;
    case "(":
      return 3;
    case "^":
      return 2;
    case "&":
    case "|":
    case "^":
      return -1;
  }
}
function getInnerPriority(char) {
  switch (char) {
    case "+":
    case "-":
      return 0;
    case "×":
    case "÷":
      return 1;
    case "(":
      return -2;
    case "^":
      return 2;
    case "&":
    case "|":
    case "^":
      return -1;  
    default:
      return -2;
  }
}
//将字符串转换为数字，压入堆栈中
function textNumberProcess(string, numArray, operatorArray) {
  //将十六进制和二进制转换为int十进制
  if(mode=="hex"){
    var tmp=parseInt(string,16);
    numArray.push(tmp)
    return;
  }
  if(mode=="bin"){
    var tmp = parseInt(string, 2);
    numArray.push(tmp)
    return;
  }
  //将string中的PI和e抽取出来放到numArray和operatorArray中
  var nums = new Array();
  nums = string.split(/e|π/);
  var numsExceptNull = new Array();

  for (var i = 0; i < nums.length; i++)
    if (nums[i] != "")
      numsExceptNull.push(nums[i]);
  var piNum = 0;
  var eNum = 0;
  for (var i = 0; i < string.length; i++) {
    if (string[i] == "π")
      piNum++;
    else if (string[i] == "e")
      eNum++;
  }
  for (var i = 0; i < numsExceptNull.length; i++)
    numArray.push(parseFloat(numsExceptNull[i]));
  //console.log("numArray" + numArray);
  for (var i = 0; i < piNum; i++) 
    numArray.push(Math.PI);
  for (var i = 0; i < eNum; i++) 
    numArray.push(Math.E);
  for (var i = 1; i < numsExceptNull.length + eNum + piNum; i++)
    operatorArray.push("×");
}