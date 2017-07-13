/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.helper",
    "bower.css!css.page.shop.1"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-shop-1",
        template: can.view("templates.page.shop.1.mustache"),
        helpers:{
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
            }
        }
    })
})