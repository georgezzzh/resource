from django.shortcuts import render,redirect
# 前面加. ，代表从同一目录导入文件
from django.template.loader import get_template
from django.http import HttpResponse,JsonResponse,Http404
from datetime import datetime
import socket
from django.http import response
import json
import random
from django.views.decorators.csrf import csrf_protect
from . import models
from .picture_encode import encode_main
import cv2
# Create your views here.

def encode(request):
     #获取本机电脑名
    myname=socket.getfqdn(socket.gethostname())
    #获取本机IP
    myaddr=socket.gethostbyname(myname)
    return render(request,'encode/encode.html')

def encode_pic(request):
  
    print(request.FILES)
    file_obj=request.FILES.get("img")
   
    print(file_obj.name)
    # 提取参数,转化为浮点数
    noise=request.POST.get("noise")
    salt_noise=request.POST.get("salt_noise")
    change_factor=request.POST.get("change_factor")
    noise=float(noise)
    salt_noise=float(salt_noise)
    change_factor=float(change_factor)

    print("noise",noise," salt_noise",salt_noise," change_factor",change_factor)
    # storage the bmp picture in local
    with open('C:/Users/geoge/Desktop/container/test.bmp','wb+') as destination:
       for chunk in file_obj.chunks():
           destination.write(chunk)
    
    imgpath = r"C:/Users/geoge/Desktop/container/test.bmp"
    img = cv2.imread(imgpath)
    #cv2.imshow("Image",img)
    cv2.waitKey(0)
    img0 = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)
    cv2.imwrite(r"C:/Users/geoge/Desktop/11_env/cv.bmp",img0)
    #调用加密图片的函数
    url_picture=encode_main(r"C:/Users/geoge/Desktop/11_env/cv.bmp",noise,salt_noise,change_factor)
    #url_picture=encode_main(r"C:/Users/geoge/Desktop/11_env/cv.bmp",0.1,0.1,0.1)
    ip_info={'url_picture':url_picture,}
    return JsonResponse(ip_info)
 
