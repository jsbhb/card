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
            setCSS_Width: function(count, options){
                return typeof count == "function"? count().length*120+"px": count.length*120+"px";
            }
        },
        scope: {
            count: 3,
            timer: null,
            toBanner: function($element, index, toIndex){
                var that = this;
                $element.find(".carousel_i[index]").removeClass("showing");
                $element.find(".carousel_i[index='"+toIndex+"']").addClass("showing");
                $element.find(".infoBanner>a[index='"+toIndex+"']").animate({left: "0px"}, 1500);
                that.timer = setTimeout(function(){
                    index = index+1<that.count? index+1: 0;
                    var toIndex = index+1<that.count? index+1: 0;
                    $element.find(".infoBanner>a[index]").css({"z-index":90,  left: "0px"});
                    $element.find(".infoBanner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".infoBanner>a[index='"+toIndex+"']").css({ "z-index":105, left: "600px"});
                    that.toBanner($element, index, toIndex);
                }, 3000);
            },
            carouselClick: function($element, index, toIndex){
                if(toIndex>index){
                    $element.find(".infoBanner>a[index]").css({"z-index":90,  left: "0px"});
                    $element.find(".infoBanner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".infoBanner>a[index='"+toIndex+"']").css({ "z-index":105, left: "600px" });
                }else{
                    $element.find(".infoBanner>a[index]").css({"z-index":90,  left: "0px"});
                    $element.find(".infoBanner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".infoBanner>a[index='"+toIndex+"']").css({ "z-index":105, left: "-600px" });
                }
                $element.find(".carousel_i[index]").removeClass("showing");
                $element.find(".carousel_i[index='"+toIndex+"']").addClass("showing");
                $element.find(".infoBanner>a[index='"+toIndex+"']").animate({left: "0px"}, 2000);
            }
        },
        events: {
            ".content-logoImg >span mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                var index = $node.attr("index")*1;
                $element.find(".content-logoImg>span").removeClass("active");
                $element.find(".content-logoImg>span").eq(index).addClass("active");
                $element.find(".content-showInfo>ul").css("z-index","99");
                $element.find(".content-showInfo>ul").eq(index).css("z-index","101");
            },
            ".infoBanner .carousel_i:not(.showing) click": function(node){
                var $element = this.element;
                var $node = $(node);
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                var toIndex = $node.attr("index")*1;
                clearTimeout(this.scope.timer);
                this.scope.carouselClick($element, index, toIndex);
            },
            ".infoBanner mouseenter": function(){
                clearTimeout(this.scope.timer);
            },
            ".infoBanner mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                that.scope.timer = setTimeout(function(){
                    var toIndex = index+1<that.scope.count? index+1: 0;
                    $element.find(".infoBanner>a[index]").css({"z-index":90,  left: "0px"});
                    $element.find(".infoBanner>a[index='"+index+"']").css({ "z-index":100, left: "0px" });
                    $element.find(".infoBanner>a[index='"+toIndex+"']").css({ "z-index":105, left: "600px" });
                    that.scope.toBanner($element, index, toIndex);
                }, 1300);
            },
            ".carousel_btn click": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                var left = $element.find(".bannerUl").css("left");
                var width = $element.find(".bannerUl").css("width");
                left = parseFloat(left);
                width = parseFloat(width);
                var range = $node.hasClass("prev")? 600: -600;
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
            //图片轮播初始化
            function bannerInit($this, $element){
                var index = 0;
                $this.scope.timer = setTimeout(function () {
                    var toIndex = index + 1 < $this.scope.count ? index + 1 : 0;
                    $element.find(".infoBanner>a[index]").css({"z-index": 90, left: "0px"});
                    $element.find(".infoBanner>a[index='"+index+"']").css({"z-index": 100, left: "0px"});
                    $element.find(".infoBanner>a[index='"+toIndex+"']").css({"z-index": 105, left: "600px"});
                    $this.scope.toBanner($element, index, toIndex);
                }, 2000)
            }
            bannerInit(this, $(element));

            //文本省略
            $(".infoBanner .text .description").dotdotdot({});
        }
    })
})