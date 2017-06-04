/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-nav-1",
        template: can.view("templates.page.nav.1.mustache"),
        helpers: {
        },
        scope: {
            isShow: false,
            timer: null,
            getWIdth: function($element){
                var that = this;
                var width = parseFloat($element.find(".showContItemList:first").css("width"));
                if(width<2){
                    $(".contType>ul").removeClass("hover");
                    $(".contType>ul>li").removeClass("hover");
                    $(".contType>ul>li .showContItemList").css("visibility", "hidden");
                    if(!$element.parent().hasClass("showed") && !this.isShow){
                        $element.parent().css("overflow", "hidden");
                    }
                }else{
                    this.timer=setTimeout(function(){
                        that.getWIdth($element);
                    },300);
                }
            }
        },
        events: {
            ".contType mouseenter": function(element){
                $(element).css("overflow", "visible");
                this.scope.isShow = true;
            },
            ".contType mouseleave": function(){
                this.scope.isShow = false;
            },
            ".contType>ul mouseenter": function(element){
                clearTimeout(this.scope.timer);
                $(element).addClass("hover");
            },
            ".contType>ul mouseleave": function(element){
                var that = this;
                var $element = element;
                this.scope.timer=setTimeout(function(){
                    that.scope.getWIdth($element);
                },300);
            },
            ".contType>ul>li mouseenter": function(element){
                $(".contType>ul>li").removeClass("hover");
                $(".contType>ul>li .showContItemList").css("visibility", "hidden");
                $(element).addClass("hover");
                $(element).find(".showContItemList").css("visibility", "visible");
            }
        }
    })
})