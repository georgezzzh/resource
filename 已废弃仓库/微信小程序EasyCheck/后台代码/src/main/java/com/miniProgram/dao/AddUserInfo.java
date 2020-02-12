package com.miniProgram.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;

@Repository
public class AddUserInfo {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public void addUser(String openid){
        LocalDate createTime=LocalDate.now();
        String sql="insert into user(openid,createTime) "+
                "values(?,?)";
        Object[]args=new Object[]{openid,createTime};
        jdbcTemplate.update(sql,args);
    }
    public void addVisitRecorder(String openid,String ipAddr){
        LocalTime time=LocalTime.now();
        LocalDate date=LocalDate.now();
        String sql="insert into login(openid,date,time,ipAddr) "+
                "values(?,?,?,?)";
        Object[]args=new Object[]{openid,date,time,ipAddr};
        jdbcTemplate.update(sql,args);
    }
    public boolean existUser(String openid){
        String sql="select * from user where openid = ? limit 1";
        Object[]args=new Object[]{openid};
        SqlRowSet rowSet= jdbcTemplate.queryForRowSet(sql,args);
        rowSet.last();
        final int N=rowSet.getRow();
        rowSet.first();
        return N>0;
    }
}
