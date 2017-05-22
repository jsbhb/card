/**
 * Created by linpengteng on 2017/5/15.
 */
define(["can"], function(can){
    var data = {
        "user": {
            name: "林鹏腾",
            description: "欢迎使用Canjs!"
        },
        "info": [
            "require(js模块化技术)",
            "jquery(jquery框架)",
            "can.jquery(依赖于jquery的canjs)",
            "mustache(前端模板)"
        ],
        author: "linpengteng"
    };

    $("#demo_header").html(can.view("mustache_header.mustache",data));
    $("#demo_center").html(can.view("mustache_center.mustache",data));
    $("#demo_tfoot").html(can.view("mustache_tfoot.mustache",data));



});