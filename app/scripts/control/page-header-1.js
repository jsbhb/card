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
    "component.page.header.1"
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-header-1></page-header-1>",

        //事件
        ".btn-search click": function(node){
            var $node = $(node);
            var type = $node.parents(".page-header-search").find(".active[searchType]").attr("searchType");
            var cont = $node.parents(".page-header-search").find(".input-search").val().trim();
            if(type == "1"){
                if(location.pathname!= "/app/webpage/searchCompany.html"){
                }
                location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
            }else if(type == "2"){
                if(location.pathname!= "/app/webpage/searchShop.html"){
                }
                location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
            }
        }
    })

});