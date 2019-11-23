package com.miniProgram.service;

import com.miniProgram.dao.StoreBillDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpServletRequest;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.Date;

@Service
public class StoreBillService {
    @Autowired
    private StoreBillDao storeBillDao;
    //格式化英文的日期转换为LocalDate日期形式
    public String formartDate(String date){

        if(65<=date.charAt(0)&&date.charAt(0)<=90){
            Date d1=new Date(date);
            LocalDate localDate=d1.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            return localDate.toString();
        }else
            return date;
    }
    public void storeBill(HttpServletRequest request){
        String openid=request.getParameter("openid");
        //日期进行格式化
        String bill_date=request.getParameter("bill_date");
        bill_date=formartDate(bill_date);
        short expense=Short.parseShort(request.getParameter("expense"));
        float amount=0;
        //后台鉴定是负数还是正数
        if(request.getParameter("amount")!=""){
            amount=Float.parseFloat(request.getParameter("amount"));
            amount=expense==1?-amount:amount;
            //保留两位小数,使用float要在后面加f
            amount=Float.parseFloat(String.format("%.2f",amount));
            if(amount>99999999.99)
                amount=99999999.99f;
        }
        String category=request.getParameter("category");
        String remark=request.getParameter("remark");
        //防止备注溢出
        if(remark.length()>125){remark=remark.substring(0,125)+"...";}
        storeBillDao.store(openid,bill_date,expense,amount,category,remark);
    }
}
