/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
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
            "[brand] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".brand");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "brand", hideElement);
            },
            "[commodityCategory2] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".commodityCategory2");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "commodityCategory2", hideElement);
            },
            "[commodityCategory3] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".commodityCategory3");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "commodityCategory3", hideElement);
            },
            "[color] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".color");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "color", hideElement);
            },
            "[size] click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = $node.parents(".size");
                var typeText = hideElement.find(".classifyType").text();
                var text = $node.text();
                this.scope.addSearch(typeText, text, "size", hideElement);
            },
            ".priceRegion .priceRegionBtn click": function(node){
                var $element = this.element;
                var $node = $(node);
                var hideElement = null;
                var typeText="价格";
                var text1 = $node.parents(".priceRegion:first").find("input").eq(0).val();
                var text2 = $node.parents(".priceRegion:first").find("input").eq(1).val();
                var text;
                if(!text1 && !text2){
                    return;
                }else if(!text1 && !!text2){
                    $node.parents(".priceRegion:first").find("input").eq(0).val("0");
                    text = "￥0-" + text2;
                }else if(!!text1 && !text2){
                    text = "￥" + text1 + "以上";
                }else if(!!text1 && !!text2 && text1*1>text2*1){
                    $node.parents(".priceRegion:first").find("input").eq(0).val(text2);
                    $node.parents(".priceRegion:first").find("input").eq(1).val(text1);
                    text = "￥" + text2 + "-" + text1;
                }else if(!!text1 && !!text2 && text1*1<=text2*1){
                    text = "￥" + text1 + "-" + text2;
                }
                this.scope.addSearch(typeText, text, "priceRegion", hideElement);
            },
            ".priceRegion input input": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val().replace(/\D/gi,"");
                $node.val(val);
            },
            ".priceRegion input propertychange": function(node){
                var $element = this.element;
                var $node = $(node);
                var val = $node.val().replace(/\D/gi,"");
                $node.val(val);
            },
            ".resultCategory>a .deleteIcon click": function(node){
                var $element = this.element;
                var $node = $(node);
                var parent = $node.parents("a:first");
                var cls = parent.attr("class");
                $element.find(".classifyCategory").find(">."+cls).show();
                if($node.parents("a:first").hasClass("priceRegion")){
                    $node.parents("a:first").find("input").val("");
                }
            },
            ".filter>.btn-group>a click": function(node) {
                var $element = this.element;
                var $node = $(node);
                if(!$node.hasClass("active")){
                    $element.find(".filter>.btn-group>a").removeClass("active");
                    $node.addClass("active");
                }else if($node.hasClass("filterHot")||$node.hasClass("filterPrice")){
                    if($node.find(">i").hasClass("font-base_directionDown")){
                        $node.find(">i").removeClass("font-base_directionDown");
                        $node.find(">i").addClass("font-base_directionUp");
                    }else{
                        $node.find(">i").addClass("font-base_directionDown");
                        $node.find(">i").removeClass("font-base_directionUp");
                    }
                }
            },
            ".ShopList .showImg img mouseenter": function(node){
                var $element = this.element;
                var $node = $(node);
                var src = $node.attr("src");
                $element.find(".ShopList .showImg img").removeClass("active");
                $node.addClass("active");
                $node.parents("li:first").find(".imgBox img").attr("src", src);
            }
        },
    })
})