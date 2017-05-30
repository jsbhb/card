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
        tag: "page-body-infoa",
        template: can.view("templates.page.body.infoA.mustache"),
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
            toBanner: function($element, index, sureIndex){
                var that = this;
                $element.find(".carousel_i[index]").removeClass("isEnd showed");
                $element.find(".carousel_i[index='"+sureIndex+"']").addClass("showed");
                $element.find(".bannerInfo>div").eq(sureIndex).animate({left: "0px"}, 1500, function(){
                    $element.find(".carousel_i[index='"+sureIndex+"']").addClass("isEnd");
                });
                this.timer = setTimeout(function(){
                    index = index+1<that.count? index+1: 0;
                    var prevIndex = index-1>=0? index-1: that.count-1;
                    var nextIndex = index+1<that.count? index+1: 0;
                    $element.find(".bannerInfo>div").css({"z-index":90,  left: "0px"});
                    $element.find(".bannerInfo>div").eq(prevIndex).css({"z-index":105, left: "-540px"});
                    $element.find(".bannerInfo>div").eq(index).css({"z-index":100, left: "0px"});
                    $element.find(".bannerInfo>div").eq(nextIndex).css({"z-index":105, left: "540px"});
                    that.toBanner($element, index, nextIndex);
                }, 5000)
            },
            carouselClick: function($element, nextIndex){
                clearTimeout(this.timer);
                var that = this;
                var index = $element.find(".carousel_i.showed").attr("index")*1;
                if(nextIndex>index){
                    $element.find(".bannerInfo>div").css({"z-index":90,  left: "0px"});
                    $element.find(".bannerInfo>div").eq(index).css({"z-index":100, left: "0px"});
                    $element.find(".bannerInfo>div").eq(nextIndex).css({"z-index":105, left: "540px"});
                    that.toBanner($element, index, nextIndex);
                }else{
                    $element.find(".bannerInfo>div").css({"z-index":90,  left: "0px"});
                    $element.find(".bannerInfo>div").eq(index).css({"z-index":100, left: "0px"});
                    $element.find(".bannerInfo>div").eq(nextIndex).css({"z-index":105, left: "-540px"});
                    that.toBanner($element, index, nextIndex);
                }
            }
        },
        events: {
            ".infoLogo>span mouseenter": function(node){
                var index = node.attr("index")*1;
                this.element.find(".infoLogo>span").removeClass("active");
                this.element.find(".infoLogo>span").eq(index).addClass("active");
                this.element.find(".infoShow>ul").css("z-index","99");
                this.element.find(".infoShow>ul").eq(index).css("z-index","101");
            },
            ".carousel_i:not(.showed) click": function(node){
                var nextIndex =  node.attr("index")*1;
                this.scope.carouselClick(this.element, nextIndex);
            },
            ".bannerInfo>div mouseenter": function(){
                clearTimeout(this.scope.timer);
            },
            ".bannerInfo>div mouseleave": function(){
                var that = this;
                var $element = this.element;
                var index = $element.find(".carousel_i.showed").attr("index")*1;
                if($element.find(".carousel_i.isEnd").length>0){
                    that.scope.timer = setTimeout(function(){
                        var prevIndex = index-1>=0? index-1: that.scope.count-1;
                        var nextIndex = index+1<that.scope.count? index+1: 0;
                        $element.find(".bannerInfo>div").css({"z-index":90,  left: "0px"});
                        $element.find(".bannerInfo>div").eq(prevIndex).css({"z-index":105, left: "-540px"});
                        $element.find(".bannerInfo>div").eq(index).css({"z-index":100, left: "0px"});
                        $element.find(".bannerInfo>div").eq(nextIndex).css({"z-index":105, left: "540px"});
                        that.scope.toBanner($element, index, nextIndex);
                    }, 500);
                }
            },
        },
        init: function(element){
            //图片轮播初始化
            function bannerInit($this, $element){
                var index = 0;
                $element.find(".carousel_i").eq(index).addClass("isEnd");
                $this.scope.timer = setTimeout(function(){
                    var prevIndex = index-1>=0? index-1: $this.scope.count-1;
                    var nextIndex = index+1<$this.scope.count? index+1: 0;
                    $element.find(".bannerInfo>div").css({"z-index":90,  left: "0px"});
                    $element.find(".bannerInfo>div").eq(prevIndex).css({"z-index":105, left: "-540px"});
                    $element.find(".bannerInfo>div").eq(index).css({"z-index":100, left: "0px"});
                    $element.find(".bannerInfo>div").eq(nextIndex).css({"z-index":105, left: "540px"});
                    $this.scope.toBanner($element, index, nextIndex);
                }, 1500);
            }
            bannerInit(this, $(element));
        }
    })

})