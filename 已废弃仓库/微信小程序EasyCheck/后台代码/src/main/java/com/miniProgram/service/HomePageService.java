package com.miniProgram.service;

import com.google.gson.Gson;
import com.miniProgram.dao.GetHomePageDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class HomePageService {
    @Autowired
    private GetHomePageDao getHomePageDao;
    public Map getWeekMonthYearData(String openid){
        Object[]args;
        Map<String,Map> datas=new HashMap<>();
        //week data
        Object[]dateObjs=DateRangeToDateObject.getDayOfWeek();
        args=new Object[]{openid,dateObjs[0],dateObjs[1]};
        datas.put("weekTotalAmount",getHomePageDao.getRangeData(args));
        //month data
        dateObjs=DateRangeToDateObject.getDayOfMonth();
        args=new Object[]{openid,dateObjs[0],dateObjs[1]};
        datas.put("monthTotalAmount",getHomePageDao.getRangeData(args));
        //year data
        dateObjs=DateRangeToDateObject.getDayOfYear();
        args=new Object[]{openid,dateObjs[0],dateObjs[1]};
        datas.put("yearTotalAmount",getHomePageDao.getRangeData(args));
        //today data
        dateObjs=DateRangeToDateObject.getDayofToday();
        args=new Object[]{openid,dateObjs[0],dateObjs[1]};
        datas.put("todayTotalAmount",getHomePageDao.getRangeData(args));
        return datas;
    }
    public String getdata(String openid){
        Map range=getWeekMonthYearData(openid);
        Map today=getHomePageDao.getTodayData(openid);
        Map result=new HashMap();
        result.put("range",range);
        result.put("today",today);
        String JsonStr=new Gson().toJson(result);
        return JsonStr;
    }
}
