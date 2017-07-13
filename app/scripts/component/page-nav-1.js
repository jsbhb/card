/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.helper",
    "bower.css!css.page.nav.1"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-nav-1",
        template: can.view("templates.page.nav.1.mustache"),
        helpers: {
            setULHeight: function(cont){
                var length = typeof cont == "function"? cont().length: cont.length;
                this.attr("ulHeight", 31*length+"px");
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
                if(width<3){
                    that.ul_mouseleave_end = true;
                    $(".contType>ul").removeClass("hover");
                    $(".contType>ul>li").removeClass("hover");
                    $(".contType>ul>li .showContItemList").css("visibility", "hidden");
                }else{
                    that.ul_mouseleave_end = false;
                    this.ul_timer=setTimeout(function(){ that.ul_mouseleave(); },150);
                }
            },
            contType_mouseleave:function(){
                var that = this;
                if(that.ul_mouseleave_end && !$(".contType").hasClass("showed")){
                    $(".contType>ul").css("overflow", "hidden");
                    $(".contType>ul").stop(true, true).animate({height: "0px"}, 200);
                }else if(!$(".contType").hasClass("showed")){
                    this.contType_timer=setTimeout(function(){ that.contType_mouseleave(); },150);
                }
            }
        },
        events: {
            ".contType mouseenter": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                $node.find(">ul").stop(true, true);
                clearTimeout(that.scope.contType_timer);
                $node.find(">ul").css({height: this.scope.ulHeight, overflow:"visible"});
            },
            ".contType>ul mouseenter": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                clearTimeout(that.scope.ul_timer);
                $node.addClass("hover");
            },
            ".contType>ul>li mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                $node.parent().find(">li").removeClass("hover");
                $node.parent().find(">li .showContItemList").css("visibility", "hidden");
                $node.addClass("hover");
                $node.find(".showContItemList").css("visibility", "visible");
            },
            ".contType>ul mouseleave": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                this.scope.timer=setTimeout(function(){
                    that.scope.ul_mouseleave();
                },200);
            },
            ".contType mouseleave": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                this.scope.timer=setTimeout(function(){
                    that.scope.contType_mouseleave();
                },200);
            }
        }
    })
})