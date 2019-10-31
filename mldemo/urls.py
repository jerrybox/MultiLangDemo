"""mldemo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
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

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path(r'^__debug__/', include(debug_toolbar.urls)),
    ]
