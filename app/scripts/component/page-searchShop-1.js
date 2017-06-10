/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "component.page.pagination",
    "bower.css!css.page.pagination",
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
                var $html = $(html);
                $html.find(".classifyType").text(typeText);
                $html.find("abbr").attr("title", text);
                $html.find(".classCont").text(text);
                hideElement.hide();
                $(".searchText").before($html);
            }
        },
        events:{
            "[brandMap] click": function(element){
                var hideElement = element.parents(".industryItem");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "industryItem", hideElement);
            },
            "[typeMap] click": function(element){
                var hideElement = element.parents(".categoryItem");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "categoryItem", hideElement);
            },
            ".resultCategory>a .deleteIcon click": function(element){
                var parent = element.parents("a:first");
                var cls = parent.attr("class");
                this.element.find(".classifyCategory").find(">."+cls).show();
            },
            ".filter>.btn-group>a click": function(element) {
                this.element.find(".filter>.btn-group>a").removeClass("active");
                element.addClass("active");
            },
            ".inputGroup>label click": function(element){
                if(element.find(">i").hasClass("fa-square-o")){
                    element.find(">i").addClass("fa-check-square-o");
                    element.find(">i").removeClass("fa-square-o");
                }
                else if(element.find(">i").hasClass("fa-check-square-o")){
                    element.find(">i").removeClass("fa-check-square-o");
                    element.find(">i").addClass("fa-square-o");
                }
            },
            ".ShopList .showImg img mouseenter": function(element){
                var src = element.attr("src");
                this.element.find(".ShopList .showImg img").removeClass("active");
                element.addClass("active");
                element.parents("li:first").find(".imgBox img").attr("src", src);
            }
        },
        init: function(element){
            this.scope.attr("$pagination", $(element).find(".pagination"));
            this.scope.$pagination.pagination({
                page:20,
                total:1,
                test:true
            });
        }
    })
})