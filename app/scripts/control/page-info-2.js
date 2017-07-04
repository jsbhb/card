/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.info.2",
    "bower.css!css.page.info.2",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-info-2></page-info-2>",

        //事件
        "a[toSearchCompany] click": function(node){
            var $node = $(node);
            var searchText = $node.attr("toSearchCompany");
            window.open(encodeURI("/app/webpage/searchCompany.html?memberName="+searchText));
        },
        "a[toSearchShop] click": function(node){
            var $node = $(node);
            var searchText = $node.attr("toSearchShop");
            window.open(encodeURI("/app/webpage/searchShop.html?commodityName="+searchText));
        }
    })
});