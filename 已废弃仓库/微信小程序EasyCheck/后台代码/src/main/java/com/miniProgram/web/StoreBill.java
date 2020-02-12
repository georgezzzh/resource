package com.miniProgram.web;

import com.miniProgram.service.StoreBillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;

@Controller
public class StoreBill {
    @Autowired
    private StoreBillService storeBillService;
    @RequestMapping(value = "/storeBill",method = RequestMethod.POST)
    public void storeBill(HttpServletRequest request, PrintWriter pw){
        storeBillService.storeBill(request);
        pw.write("ok");
        pw.flush();
        pw.close();
    }
}
