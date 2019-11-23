package com.miniProgram.web;

import com.miniProgram.service.CheckoutDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class CheckoutDetail {
    @Autowired
    private CheckoutDetailService checkoutDetailService;
    @RequestMapping(value = "/deleteCheckout",method = RequestMethod.GET)
    public void deleteCheckout(@RequestParam("deal_id") String deal_id,
                               @RequestParam("openid") String openid, HttpServletResponse response){
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/json;charset=utf-8");

        try(PrintWriter pw=response.getWriter()){
            String resp=checkoutDetailService.deleteCheckourById(openid,deal_id);
            pw.write(resp);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    @RequestMapping(value = "/checkoutDetail",method = RequestMethod.GET)
    public void getCheckoutDetail(@RequestParam("deal_id") String deal_id,
                                  @RequestParam("openid") String openid, HttpServletResponse response){

        response.setCharacterEncoding("utf-8");
        response.setContentType("text/json;charset=utf-8");
        PrintWriter pw=null;
        try {
            pw=response.getWriter();
        } catch (IOException e) {
            e.printStackTrace();
        }
       String result=checkoutDetailService.getCheckoutById(openid,deal_id);
        pw.write(result);
        pw.flush();
        pw.close();
    }
}
