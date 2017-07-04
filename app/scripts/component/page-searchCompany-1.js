/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "bower.css!css.page.searchCompany.1"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-searchcompany-1",
        template: can.view("templates.page.searchCompany.1.mustache"),
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
                $(".searchCont").before($html);
            }
        },
        events:{
            "[industrymap] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".industryItem:first");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "industryItem", hideElement);
            },
            "[dictmap] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".dictItem:first");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "dictItem", hideElement);
            },
            "[entrymap] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".entryItem:first");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "entryItem", hideElement);
            },
            ".resultCategory>a .deleteIcon click": function(node){
                var $element = this.element;
                var $node = $(node);
                var parent = $node.parents("a:first");
                var cls = parent.attr("class");
                $element.find(".classifyCategory").find(">."+cls).show();
            },
            ".filter>.btn-group>a click": function(node) {
                var $element = this.element;
                var $node = $(node);
                $element.find(".filter>.btn-group>a").removeClass("active");
                $node.addClass("active");
            },
            ".inputGroup>label click": function(node){
                var $element = this.element;
                var $node = $(node);
                if($node.find(">i").hasClass("fa-square-o")){
                    $node.find(">i").addClass("fa-check-square-o");
                    $node.find(">i").removeClass("fa-square-o");
                }
                else if($node.find(">i").hasClass("fa-check-square-o")){
                    $node.find(">i").removeClass("fa-check-square-o");
                    $node.find(">i").addClass("fa-square-o");
                }
            }
        },
    })
})