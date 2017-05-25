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
                var css = $(elements[0]).attr("items-index")*1>4?
                          {"top": "auto","bottom": "0px","display": "block"}:
                          {"top": "0px","bottom": "auto","display": "block"}
                $(".nav_center_content2").css(css);
                $(".nav_left>.items>li").removeClass("hover");
                $(elements[0]).addClass("hover");
            },
            ".nav_left mouseleave,.nav_center_content2 mouseleave": function(elements, event){
                $(".nav_center_content2").css("display", "none");
                $(".nav_left>.items>li").removeClass("hover");
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