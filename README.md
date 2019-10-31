django-project-Sample:
----------------------
* -i https://pypi.doubanio.com/simple/
* django>=2.2,<2.3
* django-debug-toolbar==2.0


super user:
-----------
```sh
admin
password123
```


change the remote repository url:
---------------------------------
git remote set-url origin https://github.com/jerrybox/new_project.git


django:
-------
```sh
# 可以查看0001.py迁移文件对应的sql语句
python manage.py sqlmigrate demoapp 0001

python manage.py migrate
```


多语言支持：
-----------

1. py
```python
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render


from django.conf import settings
from django.utils.translation import LANGUAGE_SESSION_KEY


def index(request):
    zh_template = "zh/index.html"
    en_template = "en/index.html"

    temp = en_template if request.session.get(LANGUAGE_SESSION_KEY) == "en" else zh_template

    context = {}
    return render(request, temp, context)

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
    path('i18n/', include('django.conf.urls.i18n'))
]
```


2. js
```js
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// 给每个需要切换语言的按钮或者链接添加两个属性：class="lang-switch-tag" language="en"
$(function(){
    var langSwitch = {
        init:function(){
            this.url = "/i18n/setlang/";
            this.addSwitchEvent();
        },
        addSwitchEvent:function(){
           var url = this.url;
           $(".lang-switch-tag").click(function(){
               var lang = $(this).attr('language');
               $.ajax({
                    url: url,
                    type: 'POST',
                    data: {'language': lang},
                    dataType: 'json',
                    contentType:'application/x-www-form-urlencoded',  // 特别注意contentType这个参数数据定了data的参数以什么形式传递，formdata格式才能被djang 抽取到request.POST里面
                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                    success:function (data) {
                        window.location.replace(window.location.href);
                        console.log("Language Switch Success");
                    },
                    error:function (data) {
                        console.log("Language Switch Error");
                    }
                })
           })
        }
    };
    langSwitch.init();
})

```



