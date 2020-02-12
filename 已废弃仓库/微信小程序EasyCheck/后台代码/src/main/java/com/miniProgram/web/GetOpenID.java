package com.miniProgram.web;

import com.google.gson.Gson;
import com.miniProgram.dao.AddUserInfo;
import com.miniProgram.service.SendToWechat;
import com.miniProgram.service.StoreBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.Map;


@Controller
public class GetOpenID {
    @Autowired
    SendToWechat sendToWechat;
    @Autowired
    AddUserInfo addUserInfo;
    /**
     * 向微信API拿到openid之后存储到用户的数据库表中，并且增加一条访客记录
     */
    @RequestMapping(value = "/getOpenId",method = RequestMethod.POST)
    public void getopenId(HttpServletRequest request,PrintWriter pw){
        String code=request.getParameter("code");
        Map datas=sendToWechat.sendRequest(code);
        if(((String)datas.get("valid")).equals("true")){
            String openid=(String)datas.get("openid");
            if(!addUserInfo.existUser(openid)){
                addUserInfo.addUser(openid);
            }
            String ipAddr=request.getRemoteAddr();
            addUserInfo.addVisitRecorder(openid,ipAddr);
        }
        String returnData=new Gson().toJson(datas);
        pw.write(returnData);
        pw.flush();
        pw.close();
    }
    @RequestMapping(value = "/test",method = RequestMethod.GET)
    public void test(PrintWriter pw){
        System.out.println("test ok");
        pw.write("{\"message\":\"hello\"}");
    }
}
