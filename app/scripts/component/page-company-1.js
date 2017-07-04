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
        tag: "page-company-1",
        template: can.view("templates.page.company.1.mustache"),
        helpers:{
        },
        scope:{
            count: 3,
            timer: null,
            toBanner: function($element, index, nextIndex, bool){
                var that = this;
                if($element.find(".carousel_i[index='"+index+"'].isShowed").length!=1){ return }
                $element.find(".carousel_i[index]").removeClass("showing isShowed");
                $element.find(".carousel_i[index='"+nextIndex+"']").addClass("showing");
                $element.find("img[index]").css({"z-index":90, opacity:0});
                $element.find("img[index='"+index+"']").css({"z-index":100, opacity:1});
                $element.find("img[index='"+nextIndex+"']").css({"z-index":95, opacity:1});
                $element.find("img[index='"+index+"']").animate({opacity: 0}, 1500, function(){
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
        events:{
            ".page-company-content .companyImg mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                $node.find(".carousel_btn").css("display","block");
                clearTimeout(this.scope.timer);
                $node.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
            },
            ".page-company-content .companyImg mouseleave": function(node){
                var $element = this.element;
                var $node = $(node);
                var that = this;
                var index = $node.find(".carousel_i.showing").attr("index")*1;
                var nextIndex= index+1<this.scope.count? index+1: 0;
                $node.find(".carousel_btn").css("display","none");
                that.scope.timer = setTimeout(function(){
                    that.scope.toBanner($node, index, nextIndex);
                }, 1500);
            },
            ".page-company-content .companyImg .carousel_i:not(.showing) click": function(node){
                var $element = this.element;
                var $node = $(node);
                clearTimeout(this.scope.timer);
                $element.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
                var nextIndex = $node.attr("index")*1;
                this.scope.carouselClick($element, nextIndex);
            },
            ".page-company-content .companyImg .carousel_btn click": function(node){
                var $element = this.element;
                var $node = $(node);
                var $companyImg = this.element.find(".companyImg");
                clearTimeout(this.scope.timer);
                $element.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
                var index = $companyImg.find(".carousel_i.showing").attr("index")*1;
                if($node.hasClass("prev")){
                    var nextIndex= index-1>=0? index-1: this.scope.count-1;
                }
                if($node.hasClass("next")){
                    var nextIndex= index+1<this.scope.count? index+1: 0;
                }
                this.scope.carouselClick($companyImg, nextIndex);
            },
            ".shopClassify a click": function(node){
                var $element = this.element;
                var $node = $(node);
                var bool = $node.hasClass("active");
                console.log(bool);
                $element.parents(".shopClassify:first").find("a").removeClass("active");
                if(!bool){
                    $node.addClass("active");
                }
            },
            ".companySort a click": function(node){
                var $element = this.element;
                var $node = $(node);
                var b1 = $node.hasClass("active");
                var b2 = $node.find("i").hasClass("font-base_directionDown");
                $node.parent().find("a").removeClass("active");
                $node.addClass("active");

                if(b1&&b2){
                    $node.find("i").removeClass("font-base_directionDown");
                    $node.find("i").addClass("font-base_directionUp");
                }else if(b1&&!b2){
                    $node.find("i").removeClass("font-base_directionUp");
                    $node.find("i").addClass("font-base_directionDown");
                }
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
            bannerInit(this, $(element).find(".companyImg"));
        }
    })
})