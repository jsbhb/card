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
        tag: "page-body-nav",
        template: can.view("templates.page.body.nav.mustache"),
        helpers: {
            isFirst: function(index, value){
                return index()==0? value: "";
            }
        },
        scope: {
            count: 6,
            timer: null,
            toShow: function($element, index){
                var css_hide= {display: "none"};
                var css_show= {display: "block"};
                var css_show_top= {top:"0px",bottom:"auto",display:"block"};
                var css_show_bottom= {top:"auto",bottom:"0px",display:"block"};
                $element.find(".itemDetails").css(css_show);
                $element.find(".itemDetails [index]").css(css_hide);
                $element.find(".itemBriefly [index]").removeClass("hover");
                $element.find(".itemBriefly [index='"+index+"']").addClass("hover");
                index<5 && $element.find(".itemDetails [index='"+index+"']").css(css_show_top);
                index>4 && $element.find(".itemDetails [index='"+index+"']").css(css_show_bottom);
            },
            toHide: function($element){
                var css_hide= {display: "none"};
                $element.find(".itemDetails").css(css_hide);
                $element.find(".itemDetails [index]").css(css_hide);
                $element.find(".itemBriefly [index]").removeClass("hover");
            },
            toBanner: function($element, index, nextIndex){
                var that = this;
                $element.find(".carousel_i[index]").removeClass("isEnd showed");
                $element.find(".carousel_i[index='"+nextIndex+"']").addClass("showed");
                $element.find(".show_banner>.bannerImg").eq(nextIndex).css({"z-index":95, opacity:1});
                $element.find(".show_banner>.bannerImg").eq(index).animate({opacity: 0}, 1500, function(){
                    $element.find(".carousel_i[index='"+nextIndex+"']").addClass("isEnd");
                });
                this.timer = setTimeout(function(){
                    index = nextIndex;
                    nextIndex = index+1<that.count? index+1: 0;
                    $element.find(".show_banner>.bannerImg").css({"z-index":90, opacity:0});
                    $element.find(".show_banner>.bannerImg").eq(index).css({"z-index":100, opacity:1});
                    that.toBanner($element, index, nextIndex);
                }, 5000)
            },
            carouselClick: function($element, nextIndex){
                clearTimeout(this.timer);
                var that = this;
                var index = $element.find(".carousel_i.showed").attr("index")*1;
                if($element.find(".carousel_i.isEnd").length>0){
                    $element.find(".show_banner>.bannerImg").css({"z-index":90, opacity:0});
                    $element.find(".show_banner>.bannerImg").eq(index).css({"z-index":100, opacity:1});
                    that.toBanner($element, index, nextIndex);
                }else{
                    index = index-1>=0? index-1: that.count-1;
                    $element.find(".show_banner>.bannerImg").not(":eq("+index+")").css({"z-index":90, opacity:0});
                    that.toBanner($element, index, nextIndex);
                }
            }
        },
        events: {
            ".itemBriefly li mouseenter": function(node){
                var index = node.attr("index")*1;
                this.scope.toShow(this.element, index);
            },
            ".navContent, .itemDetails mouseleave": function(){
                this.scope.toHide(this.element);
            },
            ".show_banner>.bannerImg mouseenter": function(){
                clearTimeout(this.scope.timer);
            },
            ".show_banner>.bannerImg mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showed").attr("index")*1;
                if($element.find(".carousel_i.isEnd").length>0){
                    that.scope.timer = setTimeout(function(){
                        var nextIndex= index+1<that.scope.count? index+1: 0;
                        $element.find(".show_banner>.bannerImg").css({"z-index":90, opacity:0});
                        $element.find(".show_banner>.bannerImg").eq(index).css({"z-index":100, opacity:1});
                        that.scope.toBanner($element, index, nextIndex);
                    }, 500);
                }
            },
            ".carousel.prev,.carousel.next click": function(node){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showed").attr("index")*1;
                var nextIndex = node.hasClass("prev")?
                    (index-1>=0? index-1: that.scope.count-1): (index+1<that.scope.count? index+1: 0);
                clearTimeout(this.scope.timer);
                $element.find(".carousel_i[index]").removeClass("isEnd showed");
                $element.find(".carousel_i[index='"+index+"']").addClass("showed");
                $element.find(".show_banner>.bannerImg").css({"z-index":90, opacity:0});
                $element.find(".show_banner>.bannerImg").eq(index).css({"z-index":100, opacity:1});
                that.scope.toBanner($element, index, nextIndex);
            },
            ".carousel_i:not(.showed) click": function(node){
                var nextIndex =  node.attr("index")*1;
                this.scope.carouselClick(this.element, nextIndex);
            }
        },
        init: function(element){
            //图片轮播初始化
            function bannerInit($this, $element){
                var index = 0;
                $element.find(".carousel_i").eq(index).addClass("isEnd");
                $this.scope.timer = setTimeout(function(){
                    var nextIndex= index+1<$this.scope.count? index+1: 0;
                    $element.find(".show_banner>.bannerImg").css({"z-index":90, opacity:0});
                    $element.find(".show_banner>.bannerImg").eq(index).css({"z-index":100, opacity:1});
                    $this.scope.toBanner($element, index, nextIndex);
                }, 1500);
            }
            bannerInit(this, $(element));
        }
    })

})