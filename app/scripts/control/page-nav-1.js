/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.nav.1",
    "bower.css!css.page.nav.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-nav-1 class='{{CONFIG.border}}'></page-nav-1>",
        config: {},
        region: {},
        requestData: {},
        requestType: [
            "queryNav"
        ],


        //自定义方法


        //自定义事件
        "a[categoryEntryId] click": function(node){
            var $node = $(node);
            var cont = $node.attr("categoryEntryName");
            window.open(encodeURI("/app/webpage/searchCompany.html?memberName="+cont));
        }

    })

});