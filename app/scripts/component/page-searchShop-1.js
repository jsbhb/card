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
                if($(".resultCategory").find(">a."+type).length>0){
                   $(".resultCategory").find(">a."+type).find("abbr").attr("title", text);
                   $(".resultCategory").find(">a."+type).find(".classCont").text(text);
                }else{
                    var $html = $(html);
                    $html.find(".classifyType").text(typeText);
                    $html.find("abbr").attr("title", text);
                    $html.find(".classCont").text(text);
                    hideElement && hideElement.hide();
                    $(".searchText").before($html);
                }
            }
        },
        events:{
            "[brand] click": function(element){
                var hideElement = element.parents(".brand");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "brand", hideElement);
            },
            "[commodityCategory2] click": function(element){
                var hideElement = element.parents(".commodityCategory2");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "commodityCategory2", hideElement);
            },
            "[commodityCategory3] click": function(element){
                var hideElement = element.parents(".commodityCategory3");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "commodityCategory3", hideElement);
            },
            "[color] click": function(element){
                var hideElement = element.parents(".color");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "color", hideElement);
            },
            "[size] click": function(element){
                var hideElement = element.parents(".size");
                var typeText = hideElement.find(".classifyType").text();
                var text = $(element).text();
                this.scope.addSearch(typeText, text, "size", hideElement);
            },
            ".priceRegion .priceRegionBtn click": function(element){
                var hideElement = null;
                var typeText="价格";
                var text1 = $(element).parents(".priceRegion:first").find("input").eq(0).val();
                var text2 = $(element).parents(".priceRegion:first").find("input").eq(1).val();
                var text;
                if(!text1 && !text2){
                    return;
                }else if(!text1 && !!text2){
                    $(element).parents(".priceRegion:first").find("input").eq(0).val("0");
                    text = "￥0-" + text2;
                }else if(!!text1 && !text2){
                    text = "￥" + text1 + "以上";
                }else if(!!text1 && !!text2 && text1*1>text2*1){
                    $(element).parents(".priceRegion:first").find("input").eq(0).val(text2);
                    $(element).parents(".priceRegion:first").find("input").eq(1).val(text1);
                    text = "￥" + text2 + "-" + text1;
                }else if(!!text1 && !!text2 && text1*1<=text2*1){
                    text = "￥" + text1 + "-" + text2;
                }
                this.scope.addSearch(typeText, text, "priceRegion", hideElement);
            },
            ".priceRegion input input": function(element){
                var val = $(element).val().replace(/\D/gi,"");
                $(element).val(val);
            },
            ".priceRegion input propertychange": function(element){
                var val = $(element).val().replace(/\D/gi,"");
                $(element).val(val);
            },
            ".resultCategory>a .deleteIcon click": function(element){
                var parent = element.parents("a:first");
                var cls = parent.attr("class");
                this.element.find(".classifyCategory").find(">."+cls).show();
                if($(element).parents("a:first").hasClass("priceRegion")){
                   $(".priceRegion input").val("");
                }
            },
            ".filter>.btn-group>a click": function(element) {
                if(!element.hasClass("active")){
                    this.element.find(".filter>.btn-group>a").removeClass("active");
                    element.addClass("active");
                }else if(element.hasClass("filterHot")||element.hasClass("filterPrice")){
                    if(element.find(">i").hasClass("font-base_directionDown")){
                        element.find(">i").removeClass("font-base_directionDown");
                        element.find(">i").addClass("font-base_directionUp");
                    }else{
                        element.find(">i").addClass("font-base_directionDown");
                        element.find(">i").removeClass("font-base_directionUp");
                    }
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