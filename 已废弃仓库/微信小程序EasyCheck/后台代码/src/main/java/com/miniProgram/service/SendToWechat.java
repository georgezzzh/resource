package com.miniProgram.service;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@Service
public class SendToWechat {
    public Map  sendRequest(String jscode){
        String result="";
        try{
            String url="https://api.weixin.qq.com/sns/jscode2session?appid=wx3f2bd001b73548e1&secret=5ac68b22ea8b5763aee1181c620c8077";
            url+=("&js_code="+jscode);
            url+="&grant_type=authorization_code";
            URL readURL=new URL(url);
            HttpURLConnection connection=(HttpURLConnection)readURL.openConnection();
            connection.setRequestMethod("GET");
            connection.setDoOutput(true);
            connection.connect();
            BufferedReader in=new BufferedReader(new InputStreamReader(connection.getInputStream()));
            String line=null;
            while((line=in.readLine())!=null){
                result+=line;
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        finally {
            JsonObject jsonObject=(JsonObject)new JsonParser().parse(result);
            Map<String,String>datas=new HashMap<String, String>();
            //防止读取不到信息，进行判断
            try{
                String openid=jsonObject.get("openid").getAsString();
                String session_key=jsonObject.get("session_key").getAsString();
                datas.put("openid",openid);
                datas.put("session_key",session_key);
                datas.put("valid","true");
            }catch (NullPointerException e){
                e.printStackTrace();
                datas.put("valid","false");
            }finally {
                return datas;
            }
        }
    }
}
