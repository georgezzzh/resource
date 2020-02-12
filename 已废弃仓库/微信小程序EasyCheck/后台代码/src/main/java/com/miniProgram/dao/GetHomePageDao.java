package com.miniProgram.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.*;

@Repository
public class GetHomePageDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public static String formatMoneyString(float num){
        if(num==0.0)
            return "0.0";
        return num>0?"+￥"+num:"-￥"+Math.abs(num);
    }
    public Map getRangeData(Object[]objs){
        //查支出
        String sql="select sum(amount) as sum ,count(*) as cnt from deal where(openid=? and bill_date between ? and ? and expense=1)";
        Object[] args=new Object[]{objs[0],objs[1],objs[2]};
        SqlRowSet sqlRowSet=jdbcTemplate.queryForRowSet(sql,args);
        Map map=new HashMap();
        float expenseSum=0;
        float incomeSum=0;
        if(sqlRowSet.next()){
            expenseSum=sqlRowSet.getFloat("sum");
            expenseSum=-expenseSum;
            int cnt=sqlRowSet.getInt("cnt");
            map.put("totalCount",cnt);
            map.put("expenseSum",formatMoneyString(expenseSum));
        }
        String incomeSql="select sum(amount) as sum1 from deal where(openid=? and bill_date between ? and ? and expense=0)";
        SqlRowSet sqlRowSet1=jdbcTemplate.queryForRowSet(incomeSql,args);
        if(sqlRowSet1.next())
            incomeSum = sqlRowSet1.getFloat("sum1");
        map.put("incomeSum", formatMoneyString(incomeSum));
        float totalSum=incomeSum+expenseSum;
        map.put("totalSum",formatMoneyString(totalSum));
        return map;
    }
    //返回今日份的一条数据
    public Map<String,String> getTodayData(String openid){
        Map<String,String> data=new HashMap<>();
        LocalDate today= LocalDate.now();
        String sql="select * from deal where (openid=? and bill_date=? and create_time= ";
        sql+="(select max(create_time) from deal where(openid=? and bill_date=?)))";
        Object[]args=new Object[]{openid,today,openid,today};
        SqlRowSet sqlRowSet= jdbcTemplate.queryForRowSet(sql,args);
        //设置预制信息
        data.put("create_time","");
        data.put("create_date","");
        data.put("amount","0.0");
        data.put("category","");
        data.put("remark","");
        data.put("expense","true");
        while(sqlRowSet.next()){
            float amount=sqlRowSet.getFloat("amount");
            if(sqlRowSet.getBoolean("expense")){
                amount=-amount;
            }
            data.put("expense",Boolean.toString(sqlRowSet.getBoolean("expense")));
            data.put("create_time",sqlRowSet.getString("create_time"));
            data.put("create_date",sqlRowSet.getString("create_date"));
            data.put("amount",formatMoneyString(amount));
            data.put("category",sqlRowSet.getString("category"));
            data.put("remark",sqlRowSet.getString("remark"));
            break;
        }
        return data;
    }
}
