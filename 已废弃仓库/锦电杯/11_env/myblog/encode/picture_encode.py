from PIL import Image
import numpy as np
import numpy.matlib
import matplotlib.pyplot as plt

import random

import cmath
import math
import scipy.misc

import cv2

def mat2gray(array):
   #实现图像矩阵的归一化
   m=np.amax(array)
   n=np.amin(array)
   det=1/(m-n)
   normData = np.zeros(np.shape(array))
   normData = (array-n)*det
   return normData


def D2I(C):
   #将D=[-x,x]的矩阵转换为8位的图像
   m=np.amax(C)
   n=np.amin(C)
   Data = np.zeros(np.shape(C))
   Z=(C-n).astype(np.float64)
   det=(m-n).astype(np.float64)
   Data = Z/det
   return Data

def psnr(target, ref, scale):
    # target:目标图像  ref:参考图像  scale:尺寸大小
    # assume RGB image
    target_data = np.array(target)
    target_data = target_data[scale:-scale,scale:-scale]
 
    ref_data = np.array(ref)
    ref_data = ref_data[scale:-scale,scale:-scale]
 
    diff = ref_data - target_data
    diff = diff.flatten('C')
    rmse = math.sqrt( np.mean(diff ** 2.) )
    return 20*math.log10(1.0/rmse)


def psnr_copy(img1, img2):
   mse = np.mean((img1/1.0 - img2/1.0) ** 2 )
   if mse < 1.0e-10:
      return 100
   return 10 * math.log10(255.0**2/mse)
#丢包测试函数
def SaltAndPepper(src,percetage,changefactor):  
    SP_NoiseImg=src 
    SP_NoiseNum=int(percetage*src.shape[0]*src.shape[1]) 
    for i in range(SP_NoiseNum): 
        randX=random.randint(0,src.shape[0]-1) 
        randY=random.randint(0,src.shape[1]-1)
        SP_NoiseImg[randX,randY]*=changefactor
        
    return SP_NoiseImg 

def encode_main(picture_url,noise,salt_noise,change_factor):
    #string=input("请输出图片路径:")

    #传输增加噪声
    #noise=float(input("请输入噪声系数:"))
    #传输丢包测试
    #salt_noise=float(input("请输入丢包系数:"))
    #change_factor=float(input("请输对每个像素点的调整系数:"))

    IR = np.array(Image.open(picture_url))
    I0 = mat2gray(IR)
    M=I0.shape[0]
    N=I0.shape[1]
    #行数，相当于M
    #列数，相当于N

    j=cmath.sqrt(-1)
    PI=3.1415926

    R1=np.random.rand(M,N) #生成[0，1]之间的随机矩阵
    R11=np.exp(R1*j*PI*2) 

    R2=np.random.rand(M,N)
    #R2=np.random.random_sample(size=(M,N))
    R22=np.exp(R2*j*PI*2)

    PK0=PI*(R2-1.0/2.0)
    m=np.sqrt(I0)
    I1=np.multiply(m,R11)#对应的矩阵元素分别相乘而不是矩阵相乘运算

    D=np.fft.fft(I1)

    Da=np.abs(D)   #振幅
    Dp=np.angle(D) #相位
    #加密
    z=np.multiply(0.5,Da)

    y=np.cos(Dp-PK0)
    #C=0.5*y
    C=np.divide(z,y)


    C1=D2I(C)

    PK=2*Dp-PK0

    #输出加密后图片
    number=random.randint(1,10000)
    pic_url=r'C:\Users\geoge\Desktop\11_env\myblog\encode\static\encode\images\encode'+str(number)+".bmp"
    scipy.misc.imsave(pic_url, C1)
    #丢包测试
    SaltImage = SaltAndPepper(C,salt_noise,change_factor)
    #cv2.imshow("Add_Salt Image",SaltImage)
    #cv2.imwrite("jiazao.bmp",SaltImage)
    C1 = np.asarray(SaltImage)
    #matrix.astype(np.int64)



    #解密
    Ct=C1+R1*noise
    p=np.exp(j*PK0)
    P1=np.multiply(Ct,p)
    P2=np.multiply(Ct,np.exp(j*PK))
    I1r=np.fft.ifft(P1+P2)
    I0d=(np.abs(I1r))**2


    #输出解密后图片
    pic_url2=r'C:\Users\geoge\Desktop\11_env\myblog\encode\static\encode\images\decode'+str(number)+".bmp"
    scipy.misc.imsave(pic_url2, I0d)
    return1=r'\static\encode\images\encode'+str(number)+".bmp"
    return2=r'\static\encode\images\decode'+str(number)+".bmp"


    #psnr1 = psnr(I0,I0d,255)
    psnr1=psnr_copy(I0,I0d)
    psnr1=str(int(psnr1))

    # 该处psnr存在bug，待修改，如果返回NAN，前端解析不了会图片
    return {
        'encode':return1,
            'decode':return2,
            'psnr':psnr1,
            }

