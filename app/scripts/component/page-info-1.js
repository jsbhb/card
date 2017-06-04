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
        tag: "page-info-1",
        template: can.view("templates.page.info.1.mustache"),
        helpers: {
            isFirst: function(val, type, options){
                if(val()==0){
                    return type;
                }else{
                    return null;
                }
            },
            isShow: function(val, count, options){
                if(val()>count-1){
                    return options.inverse(options.context);
                }
                else{
                    return options.fn(options.context);
                }
            },
            parsefloat: function(val){
                return "￥"+parseFloat(val()).toFixed(2);
            }
        },
        scope: {
            count: 3,
            timer: null,
            toBanner: function($element, index, toIndex){
                var that = this;
                $element.find(".carousel_i[index]").removeClass("showing");
                $element.find(".carousel_i[index='"+toIndex+"']").addClass("showing");
                $element.find(".info_banner>a[index='"+toIndex+"']").animate({left: "0px"}, 1500);
                that.timer = setTimeout(function(){
                    index = index+1<that.count? index+1: 0;
                    var nextIndex = index+1<that.count? index+1: 0;
                    $element.find(".info_banner>a").css({"z-index":90,  left: "0px"});
                    $element.find(".info_banner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".info_banner>a[index='"+nextIndex+"']").css({ "z-index":105, left: "600px"});
                    that.toBanner($element, index, nextIndex);
                }, 3500);
            },
            carouselClick: function($element, index, nextIndex){
                var that = this;
                if(nextIndex>index){
                    $element.find(".info_banner>a").css({"z-index":90,  left: "0px"});
                    $element.find(".info_banner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".info_banner>a[index='"+nextIndex+"']").css({ "z-index":105, left: "600px" });
                    that.toBanner($element, index, nextIndex);
                }else{
                    $element.find(".info_banner>a").css({"z-index":90,  left: "0px"});
                    $element.find(".info_banner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".info_banner>a[index='"+nextIndex+"']").css({ "z-index":105, left: "-600px" });
                    that.toBanner($element, index, nextIndex);
                }
            }
        },
        events: {
            ".content-logoImg >span mouseenter": function(node){
                var index = node.attr("index")*1;
                this.element.find(".content-logoImg>span").removeClass("active");
                this.element.find(".content-logoImg>span").eq(index).addClass("active");
                this.element.find(".content-showInfo>ul").css("z-index","99");
                this.element.find(".content-showInfo>ul").eq(index).css("z-index","101");
            },
            ".carousel_i:not(.showing) click": function(node){
                var index = this.element.find(".carousel_i.showing").attr("index")*1;
                clearTimeout(this.scope.timer);
                this.element.find(".info_banner>a[index='"+index+"']").stop(true,true);
                clearTimeout(this.scope.timer);
                var nextIndex =  node.attr("index")*1;
                this.scope.carouselClick(this.element, index, nextIndex);
            },
            ".info_banner mouseenter": function(){
                var $element = this.element;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                clearTimeout(this.scope.timer);
                $element.find(".info_banner>a[index='"+index+"']").stop(true,true);
                clearTimeout(this.scope.timer);
            },
            ".info_banner mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                that.scope.timer = setTimeout(function(){
                    index = index+1<that.count? index+1: 0;
                    var nextIndex = index+1<that.count? index+1: 0;
                    $element.find(".info_banner>a").css({"z-index":90,  left: "0px"});
                    $element.find(".info_banner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".info_banner>a[index='"+nextIndex+"']").css({ "z-index":105, left: "600px" });
                    that.scope.toBanner($element, index, nextIndex);
                }, 2500);
            },
            ".carousel.prev,.carousel.next click": function(node){
                var that = this;
                var $element = this.element;
                var left = $element.find(".bannerUl").css("left");
                var width = $element.find(".bannerUl").css("width");
                left = parseFloat(left);
                width = parseFloat(width);
                var range = node.hasClass("prev")? 600: -600;
                if(left + range > 0){
                    $element.find(".bannerUl").animate({left: "0px"}, 300);
                }else if(left + range < 1200-width){
                    $element.find(".bannerUl").animate({left: (1200-width)+"px"}, 300);
                }else{
                    $element.find(".bannerUl").animate({left: (left+range)+"px"}, 500)
                }
            },
        },
        init: function(element){
            //logo轮播模块设置
            var length = $(element).find(".bannerUl>li").length;
            $(element).find(".bannerUl").css("width", 150*length+"px");

            //图片轮播初始化
            function bannerInit($this, $element){
                var index = 0;
                $this.scope.timer = setTimeout(function () {
                    var nextIndex = index + 1 < $this.scope.count ? index + 1 : 0;
                    $element.find(".info_banner>a").css({"z-index": 90, left: "0px"});
                    $element.find(".info_banner>a[index='" + index + "']").css({"z-index": 100, left: "0px"});
                    $element.find(".info_banner>a[index='" + nextIndex + "']").css({"z-index": 105, left: "600px"});
                    $this.scope.toBanner($element, index, nextIndex);
                }, 1500)
            }
            bannerInit(this, $(element));
        }
    })
})