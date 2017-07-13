/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.helper",
    "bower.css!css.page.searchShop.1"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-searchshop-1",
        template: can.view("templates.page.searchShop.1.mustache"),
        helpers:{
        },
        scope:{
            addSearch: function(typeText, text, type, hideElement){
                var html = '<a href="javascript:void(0)" class="'+type+'">'+
                            '<abbr title="">'+
                            '<span class="classifyType"></span>'+
                            '<span class="classCont"></span>'+
                            '<span class="deleteIcon"></span>'+
                            '</abbr>'+
                            '</a>'+
                            '<i class="rightIcon">></i>';
                if($(".resultCategory").find(">a."+type).length>0){
                   $(".resultCategory").find(">a."+type).find("abbr").attr("title", text);
                   $(".resultCategory").find(">a."+type).find(".classCont").text(text);
                }else{
                    var $html = $(html);
                    $html.find(".classifyType").text(typeText);
                    $html.find("abbr").attr("title", text);
                    $html.find(".classCont").text(text);
                    hideElement && hideElement.hide();
                    $(".searchCont").before($html);
                }
            }
        },
        events:{
            ".priceRegion .price-input input": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val().replace(/\D/i,"");
                $node.val(val);
            },
            ".priceRegion .price-input propertychange": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val().replace(/\D/i,"");
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