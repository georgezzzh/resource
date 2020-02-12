package com.miniProgram.service;

import com.google.gson.Gson;
import com.miniProgram.dao.ProcessCheckoutByIdDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CheckoutDetailService {
    @Autowired
    private ProcessCheckoutByIdDao processCheckoutByIdDao;
    public String getCheckoutById(String openid,String deal_id){
        Map<String,String> map;
        map=processCheckoutByIdDao.getCheckout(openid,deal_id);
        String result=new Gson().toJson(map);
        return result;
    }
    public String deleteCheckourById(String openid,String deal_id){
        processCheckoutByIdDao.deleteCheckout(openid,deal_id);
        return "{\"status\":\"ok\"}";
    }
}
