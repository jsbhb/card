/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-shop-2",
        template: can.view("templates.page.shop.2.mustache"),
        helpers:{
        },
        scope:{

        },
        events:{
            ".otherImg>img mouseenter": function(element){
                var src = element.attr("src");
                this.element.find(".otherImg>img").removeClass("active");
                this.element.find(".showImg>img").attr("src", src);
                element.addClass("active");
            },
            ".color img click": function(element){
                this.element.find(".color img").removeClass("active");
                element.addClass("active");
            },
            ".size span:not(:first-child) click": function(element){
                this.element.find(".size span").removeClass("active");
                element.addClass("active");
            }
        }
    })
})