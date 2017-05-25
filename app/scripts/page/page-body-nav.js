/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "comm.model",
    "fixture.test"
], function($, _, can, Comm){

    //Model
    var Model = new Comm({

        /** Model
         *   @description 模型
         *   @findNav  查询Nav数据
         */
        findNav: function(){
            return this.sendRequest({
                url: "",
                type: "get"
            })
        }
    });

    /** Component
     *   @description: 组件
     */
    can.Component.extend({
        tag: "load-page-body-nav",
        scope: {

        },
        template: can.view("page-body-nav.mustache"),
        helpers: {
        },
        events: {
            ".nav_left li mouseenter": function(elements, event){
                $(".nav_left>.items>li").removeClass("hover");
                $(".nav_center_content2").css("display", "block");
                if($(elements[0]).attr("items-index")*1>4){
                    $(".nav_center_content2").css("top", "auto");
                    $(".nav_center_content2").css("bottom", "0px");
                }else{
                    $(".nav_center_content2").css("bottom", "auto");
                    $(".nav_center_content2").css("top", "0px");
                }
                $(elements[0]).addClass("hover");
            },
            ".page-body-nav-content mouseleave": function(elements, event){
                $(".nav_left>.items>li").removeClass("hover");
                $(".nav_center_content2").css("display", "none");
            }
        },
        init: function(){

        }
    })

    /** 加载js时
     *   @description: 发起请求，返回数据，处理模板并渲染输出
     */
    can.when(true).done(function(responseData){
        $(".load-page-body-nav").html(
            can.mustache("<load-page-body-nav></load-page-body-nav>")(responseData)
        );
    })

})