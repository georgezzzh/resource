package com.miniProgram.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class ProcessCheckoutByIdDao {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    public Map getCheckout(String openid,String deal_id){
        String sql="select * from deal where openid=? and deal_id=?";
        Map map=jdbcTemplate.queryForMap(sql,openid,deal_id);
        return map;
    }
    public void deleteCheckout(String openid,String deal_id){
        String sql="delete from deal where openid=? and deal_id=?";
        jdbcTemplate.update(sql,openid,deal_id);
    }
}
