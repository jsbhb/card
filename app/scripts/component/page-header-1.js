/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "config.helper",
    "bower.css!css.page.header.1"
], function($, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-header-1",
        template: can.view("templates.page.header.1.mustache"),
        helpers: {
        },
        scope: {
            timer: null ,
            qrcodeImgHide: function(element){
                $(element).find(".qrcodeImg").css("display","none");
            }
        },
        events: {
            ".page-header-search .searchType>span click": function(node){
                var $element = this.element;
                var $node = $(node);
                $node.parent().find(">span").removeClass("active");
                $node.addClass("active");
            },
            ".page-header-search .input-search keydown": function(node, e){
                var $element = this.element;
                var $node = $(node);
                var event = e || window.event;
                var keyCode = event.which || event.keyCode;
                if(keyCode == 13){
                    $node.parent().find(".btn-search").click();
                }
            },
            ".page-header-search .input-search input": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val();
                if(val!=""){
                    $node.parents(".page-header-search:first").find(".searchIcon").css("display","none");
                }else{
                    $node.parents(".page-header-search:first").find(".searchIcon").css("display","block");
                }
            },
            ".page-header-search .input-search propertychange": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val();
                if(val!=""){
                    $node.parents(".page-header-search:first").find(".searchIcon").css("display","none");
                }else{
                    $node.parents(".page-header-search:first").find(".searchIcon").css("display","block");
                }
            },
            ".page-header-qrcode mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                clearTimeout(this.scope.timer);
                $node.find(".qrcodeImg").css("display","inline-block");
            },
            ".page-header-qrcode mouseleave": function(node){
                var $element = this.element;
                var $node = $(node);
                var that = this;
                that.scope.timer = setTimeout(function(){ that.scope.qrcodeImgHide($node) }, 350);
            },
        }
    })

})