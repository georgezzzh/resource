package com.miniProgram.service;

import com.google.gson.Gson;
import com.miniProgram.dao.RangeBillDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Map;

@Service
public class RangeBillService {
    @Autowired
    private RangeBillDao rangeBillDao;
    public String getRangeBillservie(String openid,String range){
        Object[]args=new Object[]{};
        switch (range){
            case "day":
                args=new Object[]{LocalDate.now(),LocalDate.now()};
                break;
            case "week":
                args=DateRangeToDateObject.getDayOfWeek();
                break;
            case "month":
                args=DateRangeToDateObject.getDayOfMonth();
                break;
            case "year":
                args=DateRangeToDateObject.getDayOfYear();
                break;
            default:
                System.out.println("range参数有误");
                break;
        }
        //一个openid，两个日期
        Object[]args1=new Object[]{openid,args[0],args[1]};
        Map map= rangeBillDao.getData(args1);
        String result= new Gson().toJson(map);
        return result;
    }
}
