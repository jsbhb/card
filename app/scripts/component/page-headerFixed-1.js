/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "config.helper",
    "bower.css!css.page.headerFixed.1"
], function($, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-headerfixed-1",
        template: can.view("templates.page.headerFixed.1.mustache"),
        helpers: {
        },
        scope: {
            timer: null ,
            qrcodeImgHide: function(element){
                $(element).find(".qrcodeImg").css("display","none");
            }
        },
        events: {
            ".page-headerFixed-search .dropdown-menu>li>a click": function(node){
                var $element = this.element;
                var $node = $(node);
                var text = $node.text();
                var searchType = $node.attr("searchType");
                $node.parents(".page-headerFixed-search").find(".searchTypeText").text(text);
                $node.parents(".page-headerFixed-search").find(".searchTypeText").attr("searchType", searchType);
            },
            ".page-headerFixed-search .input-search keydown": function(node, e){
                var $element = this.element;
                var $node = $(node);
                var event = e || window.event;
                var keyCode = event.which || event.keyCode;
                if(keyCode == 13){
                    $node.parent().find(".btn-search").click();
                }
            },
            ".page-headerFixed-qrcode mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                clearTimeout(this.scope.timer);
                $node.find(".qrcodeImg").css("display","inline-block");
            },
            ".page-headerFixed-qrcode mouseleave": function(node){
                var that = this;
                var $element = this.element;
                var $node = $(node);
                that.scope.timer = setTimeout(function(){ that.scope.qrcodeImgHide($node) }, 350);
            },
        },
    })

})