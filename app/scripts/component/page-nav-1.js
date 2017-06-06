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
            setULHeight: function(cont){
                this.attr("ulHeight", 50*cont.length+"px");
            }
        },
        scope: {
            ul_timer: null,
            contType_timer: null,
            ulHeight: "0px",
            ul_mouseleave_end: true,
            ul_mouseleave: function(){
                var that = this;
                var width = parseFloat($(".contType>ul").find(".showContItemList:first").css("width"));
                if(width<2){
                    that.ul_mouseleave_end = true;
                    $(".contType>ul").removeClass("hover");
                    $(".contType>ul>li").removeClass("hover");
                    $(".contType>ul>li .showContItemList").css("visibility", "hidden");
                }else{
                    that.ul_mouseleave_end = false;
                    this.ul_timer=setTimeout(function(){ that.ul_mouseleave(); },200);
                }
            },
            contType_mouseleave:function(){
                var that = this;
                if(that.ul_mouseleave_end && !$(".contType").hasClass("showed")){
                    $(".contType>ul").css("overflow", "hidden");
                    $(".contType>ul").stop(true, true).animate({height: "0px"}, 1000);
                }else if(!$(".contType").hasClass("showed")){
                    this.contType_timer=setTimeout(function(){ that.contType_mouseleave(); },200);
                }
            }
        },
        events: {
            ".contType mouseenter": function(element){
                var that = this;
                $(".contType>ul").stop(true, true);
                clearTimeout(that.scope.contType_timer);
                $(".contType>ul").css({height: this.scope.ulHeight, overflow:"visible"});
            },
            ".contType>ul mouseenter": function(element){
                var that = this;
                clearTimeout(that.scope.ul_timer);
                $(element).addClass("hover");
            },
            ".contType>ul>li mouseenter": function(element){
                $(".contType>ul>li").removeClass("hover");
                $(".contType>ul>li .showContItemList").css("visibility", "hidden");
                $(element).addClass("hover");
                $(element).find(".showContItemList").css("visibility", "visible");
            },
            ".contType>ul mouseleave": function(){
                var that = this;
                this.scope.timer=setTimeout(function(){
                    that.scope.ul_mouseleave();
                },200);
            },
            ".contType mouseleave": function(){
                var that = this;
                this.scope.timer=setTimeout(function(){
                    that.scope.contType_mouseleave();
                },200);
            }
        }
    })
})