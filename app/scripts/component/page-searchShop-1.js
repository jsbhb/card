/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.text!template.page.searchShop.1.mustache"
], function($, can, template){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-searchshop-1",
        template: template,
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
});