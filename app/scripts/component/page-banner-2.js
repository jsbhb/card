/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-banner-2",
        template: can.view("templates.page.banner.2.mustache"),
        helpers: {
        },
        scope: {
            count: 6,
            timer: null,
            toBanner: function($element, index, nextIndex, bool){
                var that = this;
                if($element.find(".carousel_i[index='"+index+"'].isShowed").length!=1){ return }
                $element.find(".carousel_i[index]").removeClass("showing isShowed");
                $element.find(".carousel_i[index='"+nextIndex+"']").addClass("showing");
                $element.find("a[index]").css({"z-index":90, opacity:0});
                $element.find("a[index='"+index+"']").css({"z-index":100, opacity:1});
                $element.find("a[index='"+nextIndex+"']").css({"z-index":95, opacity:1});
                $element.find("a[index='"+index+"']").animate({opacity: 0}, 1500, function(){
                    $element.find(".carousel_i[index='"+nextIndex+"']").addClass("isShowed");
                    if(!bool){
                        that.timer = setTimeout(function(){
                            index = nextIndex;
                            nextIndex = index+1<that.count? index+1: 0;
                            that.toBanner($element, index, nextIndex);
                        }, 3500)
                    }
                });
            },
            carouselClick: function($element, nextIndex){
                var that = this;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                that.toBanner($element, index, nextIndex, true);
            }
        },
        events: {
            ".page-banner-content>.bannerImg mouseenter": function(){
                var $element = this.element;
                clearTimeout(this.scope.timer);
                $element.find("a[index]").stop(true,true);
                clearTimeout(this.scope.timer);
            },
            ".page-banner-content>.bannerImg mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                var nextIndex= index+1<this.scope.count? index+1: 0;
                that.scope.timer = setTimeout(function(){
                    that.scope.toBanner($element, index, nextIndex);
                }, 1500);
            },
            ".page-banner-content>.bannerImg .carousel_i:not(.showing) click": function(node){
                var $element = this.element;
                var $node = $(node);
                clearTimeout(this.scope.timer);
                $element.find("a[index]").stop(true,true);
                clearTimeout(this.scope.timer);
                var nextIndex = $node.attr("index")*1;
                this.scope.carouselClick(this.element, nextIndex);
            }
        },
        init: function(element){
            //图片轮播初始化
            function bannerInit($this, $element){
                var index = 0;
                $element.find(".carousel_i[index='"+index+"']").addClass("isShowed");
                $this.scope.timer = setTimeout(function(){
                    var nextIndex= index+1<$this.scope.count? index+1: 0;
                    $this.scope.toBanner($element, index, nextIndex);
                }, 1500);
            }
            bannerInit(this, $(element));
        }
    })

})