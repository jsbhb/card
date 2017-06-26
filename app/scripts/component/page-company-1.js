/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "component.page.pagination",
    "bower.css!css.page.pagination",
], function($, _, can){

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
            ".page-company-content .companyImg mouseenter": function(){
                clearTimeout(this.scope.timer);
                this.element.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
            },
            ".page-company-content .companyImg mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                var nextIndex= index+1<this.scope.count? index+1: 0;
                that.scope.timer = setTimeout(function(){
                    that.scope.toBanner($element, index, nextIndex);
                }, 1500);
            },
            ".page-company-content .companyImg .carousel_i:not(.showing) click": function(node){
                clearTimeout(this.scope.timer);
                this.element.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
                var nextIndex =  node.attr("index")*1;
                this.scope.carouselClick(this.element, nextIndex);
            },
            ".page-company-content .companyImg .carousel click": function(node){
                clearTimeout(this.scope.timer);
                this.element.find("img[index]").stop(true,true);
                clearTimeout(this.scope.timer);
                var $element = this.element.find(".companyImg");
                var index = $element.find(".carousel_i.showing").attr("index")*1;
                if($(node).hasClass("prev")){
                    var nextIndex= index-1>=0? index-1: this.scope.count-1;
                }
                if($(node).hasClass("next")){
                    var nextIndex= index+1<this.scope.count? index+1: 0;
                }
                this.scope.carouselClick($element, nextIndex);
            },
            ".shopClassify a click": function(element){
                var bool = $(element).hasClass("active");
                $(element).parents(".shopClassify:first").find("a").removeClass("active");
                if(!bool){
                    $(element).addClass("active");
                }
            },
            ".companySort a click": function(element){
                var b1 = $(element).hasClass("active");
                var b2 = $(element).find("i").hasClass("font-base_directionDown");
                $(".companySort a").removeClass("active");
                $(element).addClass("active");

                if(b1&&b2){
                    $(element).find("i").removeClass("font-base_directionDown");
                    $(element).find("i").addClass("font-base_directionUp");
                }else if(b1&&!b2){
                    $(element).find("i").removeClass("font-base_directionUp");
                    $(element).find("i").addClass("font-base_directionDown");
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

            //分页
            this.scope.attr("$pagination", $(element).find(".paging"));
            this.scope.$pagination.pagination({
                page:20,
                total:1,
                test:true
            });
        }
    })
})