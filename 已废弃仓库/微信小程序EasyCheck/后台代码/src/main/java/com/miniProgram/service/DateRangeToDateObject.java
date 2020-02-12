package com.miniProgram.service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;

public class DateRangeToDateObject {
    public static Object[] getDayofToday(){
        return new Object[]{LocalDate.now(),LocalDate.now()};
    }
    public static Object[] getDayOfWeek(){
        Calendar cal=Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK,1);
        LocalDate firstDayOfWeek=LocalDate.ofInstant(cal.getTime().toInstant(), ZoneId.systemDefault());
        cal=Calendar.getInstance();
        cal.set(Calendar.DAY_OF_WEEK,7);
        LocalDate lastDayOfWeek=LocalDate.ofInstant(cal.getTime().toInstant(), ZoneId.systemDefault());
        Object[]obj=new Object[]{firstDayOfWeek,lastDayOfWeek};
        return  obj;
    }
    public static Object[] getDayOfMonth(){
        Calendar cal=Calendar.getInstance();
        cal.set(Calendar.DAY_OF_MONTH,1);
        LocalDate firstDayOfMonth=LocalDate.ofInstant(cal.getTime().toInstant(), ZoneId.systemDefault());
        cal.roll(Calendar.DATE,-1);
        LocalDate lastDayOfMonth=LocalDate.ofInstant(cal.getTime().toInstant(),ZoneId.systemDefault());
        Object[]result=new Object[]{firstDayOfMonth,lastDayOfMonth};
        return result;
    }
    public static Object[] getDayOfYear(){
        String date=LocalDate.now().toString().substring(0,4);
        String firstDayOfYear=date+"-01-01";
        String lastDayOfYear=date+"-12-31";
        Object[]objects=new Object[]{firstDayOfYear,lastDayOfYear};
        return objects;
    }
}
