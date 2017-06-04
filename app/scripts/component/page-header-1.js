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
        tag: "page-header-1",
        template: can.view("templates.page.header.1.mustache"),
        helpers: {
        },
        scope: {
        },
        events: {
            ".page-header-search .dropdown-menu>li>a click": function(element){
                var text = $(element).text();
                var type = $(element).attr("type");
                $(".searchTypeText").text(text);
                $(".searchTypeText").attr("searchType", type);
            }
        }
    })

})