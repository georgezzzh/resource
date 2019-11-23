from django.conf.urls import url,include
from . import views
urlpatterns = [
 
    #
    url(r'^$',views.encode,name='url-encode'),
    url(r'^encode_picture',views.encode_pic,name='url-encode_picture'),
]
