/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can"
], function($, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-searchshop-1",
        template: can.view("templates.page.searchShop.1.mustache"),
        helpers:{
        },
        scope:{
        },
        events:{
            ".priceRegion input blur": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val().replace(/\D/gi,"");
                $node.val(val);
            },
            ".ShopList .showImg img mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                var src = $node.attr("src");
                $element.find(".ShopList .showImg img").removeClass("active");
                $node.addClass("active");
                $node.parents("li:first").find(".imgBox img").attr("src", src);
            }
        }
    })
})