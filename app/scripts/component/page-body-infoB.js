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
        tag: "page-body-infob",
        template: can.view("templates.page.body.infoB.mustache"),
        helpers: {
        },
        scope: {
        },
        events: {
            ".carousel.prev,.carousel.next click": function(node){
                var that = this;
                var $element = this.element;
                var left = $element.find(".logoUl").css("left");
                var width = $element.find(".logoUl").css("width");
                left = parseFloat(left);
                width = parseFloat(width);
                var range = node.hasClass("prev")? 550: -550;
                if(left + range > 0){
                    $element.find(".logoUl").animate({left: "0px"}, 300);
                }else if(left + range < 1100-width){
                    $element.find(".logoUl").animate({left: (1100-width)+"px"}, 300);
                }else{
                    $element.find(".logoUl").animate({left: (left+range)+"px"}, 500)
                }
            },
        },
        init: function(element){
            //logo轮播模块设置
            var length = $(element).find(".logoUl>li").length;
            $(element).find(".logoUl").css("width", 110*length+"px");
        }
    })

})