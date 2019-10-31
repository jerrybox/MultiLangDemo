/**
 * Created by Jerry on 2019/10/30.
 * https://docs.djangoproject.com/en/2.0/ref/csrf/
 * https://github.com/jerrybox/FrontEnd/tree/master/sharpjquery
 */
// var csrftoken = getCookie('csrftoken');
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
                    contentType:'application/x-www-form-urlencoded',
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
