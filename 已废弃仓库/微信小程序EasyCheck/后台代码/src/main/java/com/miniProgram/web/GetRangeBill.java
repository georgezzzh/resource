package com.miniProgram.web;

import com.miniProgram.service.RangeBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
public class GetRangeBill {
    @Autowired
    RangeBillService rangeBillService;
    @RequestMapping(value = "/getRangeData",method = RequestMethod.POST)
    public void getData(HttpServletRequest request, HttpServletResponse response)
    throws IOException
    {
        response.setCharacterEncoding("utf-8");
        response.setContentType("text/json;charset=utf-8");
        PrintWriter pw=response.getWriter();
        String openid=request.getParameter("openid");
        String range=request.getParameter("range");
        String result=rangeBillService.getRangeBillservie(openid,range);
        pw.write(result);
        pw.flush();
        pw.close();
    }
}
