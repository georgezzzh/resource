from PIL import Image
import numpy as np

import numpy.matlib

import matplotlib.pyplot as plt

import cmath
import scipy.misc

def maxminnorm(array):
   m=np.amax(array)
   n=np.amin(array)
   det=1/(m-n)
   normData = np.zeros(np.shape(array))
   normData = (array-n)*det
   return normData


def maxminnorm1(C):
   m=np.amax(C)
   n=np.amin(C)
   Data = np.zeros(np.shape(C))
   Z=(C-n).astype(np.float64)
   det=(m-n).astype(np.float64)
   Data = Z/det
   return Data


#string=input("请输出图片路径:")
IR = np.array(Image.open("C:\\Users\\geoge\\Desktop\\1.bmp"))

I0 = maxminnorm(IR)


M=I0.shape[0]
N=I0.shape[1]
#行数，相当于M
#列数，相当于N

j=cmath.sqrt(-1)
PI=3.1415926

R1=np.random.rand(M,N) #生成[0，1]之间的随机矩阵

R11=np.exp(R1*j*PI*2) #???
#print(R11)


R2=np.random.rand(M,N)
#R2=np.random.random_sample(size=(M,N))
R22=np.exp(R2*j*PI*2) #???


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

C1=maxminnorm1(C)
print(C1)
PK=2*Dp-PK0

#输出加密后图片
scipy.misc.imsave('加密后.bmp', C1)

#解密
Ct=C+R1*0.01
p=np.exp(j*PK0)
P1=np.multiply(Ct,p)
P2=np.multiply(Ct,np.exp(j*PK))
I1r=np.fft.ifft(P1+P2)
I0d=(np.abs(I1r))**2


#输出解密后图片
scipy.misc.imsave('解密后.bmp', I0d)

