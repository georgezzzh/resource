package com.miniProgram.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.util.*;

@Repository
public class RangeBillDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public static String formatMoneyString(float num){
        if(num==0.0)
            return "0.0";
        return num>0?"+￥"+num:"-￥"+Math.abs(num);
    }
    public Map getData(Object[]args){
        String sql="select * from deal where(openid=? and bill_date between ? and ?) order by bill_date desc ";
        SqlRowSet rowSet=jdbcTemplate.queryForRowSet(sql,args);
        String bill_date="";
        Map<String,List> map=new LinkedHashMap<>();
        ArrayList arrayList=new ArrayList();
        while (rowSet.next()){
            String temp=rowSet.getString("bill_date");
            if(!bill_date.equals(temp)&&arrayList.size()>0){
                    map.put(bill_date,arrayList);
                    arrayList=new ArrayList();
            }
            HashMap<String,String> hashMapTemp=new HashMap<>();
            //tinyint(1)用Boolean就好了
            String incomeORexpense=rowSet.getBoolean("expense")?"支出":"收入";
            hashMapTemp.put("deal_id",Integer.toString(rowSet.getInt("deal_id")));
            hashMapTemp.put("expense",incomeORexpense);
            hashMapTemp.put("category",rowSet.getString("category"));
            String remark=rowSet.getString("remark");
            if(remark.length()>10)
                remark=remark.substring(0,10)+"...";
            hashMapTemp.put("remark",remark);
            float amount=rowSet.getFloat("amount");
            if(rowSet.getBoolean("expense"))
                amount=-amount;
            hashMapTemp.put("amount",formatMoneyString(amount));
            hashMapTemp.put("create_time",rowSet.getString("create_time"));
            arrayList.add(hashMapTemp);
            bill_date=temp;
        }
        if(!map.containsKey(bill_date)&&arrayList.size()>0)
            map.put(bill_date,arrayList);
        return map;
    }
}