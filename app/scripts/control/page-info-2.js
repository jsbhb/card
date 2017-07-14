/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.info.2",
    "bower.text!templates.page.info.2.mustache",
    "bower.css!css.page.info.2"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        templates: "<page-info-2></page-info-2>",
        isDynamic: "NO",


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