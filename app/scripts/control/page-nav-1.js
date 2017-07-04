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
    "component.page.nav.1",
    "bower.css!css.page.nav.1",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        requestType:   "queryNav",
        templatesPath: "<page-nav-1 class='{{CONFIG.border}}'></page-nav-1>",

        //事件
        "a[categoryEntryId] click": function(node){
            var $node = $(node);
            var type = $node.attr("categoryEntryId");
            var cont = $node.attr("categoryEntryName");
            window.open(encodeURI("/app/webpage/searchCompany.html?categoryEntryId="+type+"&categoryEntryName="+cont));
            /* window.open(encodeURI("/app/webpage/searchShop.html?categoryEntryId="+type+"&categoryEntryName="+cont)); */
        }
    })

});