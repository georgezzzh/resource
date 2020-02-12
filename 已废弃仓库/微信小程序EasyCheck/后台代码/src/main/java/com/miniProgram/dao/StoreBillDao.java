package com.miniProgram.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public class StoreBillDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void store(String openid,String bill_date,short expense,float amount,String category,String remark){
        LocalDate create_date= LocalDate.now();
        LocalTime create_time=LocalTime.now();
        if(expense==1)
        amount=-amount;
        String sql="insert into deal(openid,bill_date,expense,amount,category,remark,create_date,create_time) "+
                "values(?,?,?,?,?,?,?,?)";
        Object[]args=new Object[]{openid,bill_date,expense,amount,category,remark,create_date,create_time};
        jdbcTemplate.update(sql,args);
    }
}