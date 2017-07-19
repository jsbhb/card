/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.text!template.page.shop.1.mustache"
], function($, can, template){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-shop-1",
        template: template,
        helpers:{
            a:function(a){
                console.log(a());
            }
        },
        scope:{

        },
        events:{
            ".otherImg>img mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                var src = $node.attr("src");
                $element.find(".otherImg>img").removeClass("active");
                $element.find(".showImg>img").attr("src", src);
                $node.addClass("active");
            },
            ".color img click": function(node){
                var $element = this.element;
                var $node = $(node);
                $element.find(".color img").removeClass("active");
                $node.addClass("active");
            },
            ".size span:not(:first-child) click": function(node){
                var $element = this.element;
                var $node = $(node);
                $element.find(".size span").removeClass("active");
                $node.addClass("active");
            },
            ".shopDetails .btn-collection click": function(node){
                var $element = this.element;
                var $node = $(node);
                $element.find(".modals_company").css({
                    "display":"block",
                    "opacity":"0"
                });
                $element.find(".modals_company").animate({"opacity":"1"},800)
            },
            ".modals_company .glyphicon-remove click": function(node){
                var $element = this.element;
                var $node = $(node);
                $element.find(".modals_company").animate({"opacity":"0"},800,function(){
                    $element.find(".modals_company").css("display","none");
                })
            }
        }
    })
});