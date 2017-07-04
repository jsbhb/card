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
    "control.page.pagination.1",
    "component.page.searchShop.1",
    "bower.css!css.page.searchShop.1",
], function($, _, can, common, Render, controlPagePagination1){

    return Render.extend({
        //子类扩展
        requestType:   "querySearchShop",
        templatesPath: "<page-searchshop-1></page-searchshop-1>",
        requestData: {
            querySearchShop: {
                "numPerPage": 10,
                "currentPage": 1
            }
        },
        renderAfterFun: function(){
            this.pagination = new controlPagePagination1("page-searchshop-1 .load-pagePagination",{
                config: { direction: "floatRight" },
                parentObj: this,
            });
        },
        callback: function(){
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                        this.pagination.dataProcessing(responseData.obj.pagination);
                    },this)
                )
        },

        //事件
        "[brand] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData[this.requestType].brand = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        "[commodityCategory2] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData[this.requestType].commodityCategory2 = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        "[commodityCategory3] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData[this.requestType].commodityCategory3 = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        "[color] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData[this.requestType].color = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        "[size] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData[this.requestType].size = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        ".priceRegion .priceRegionBtn click": function(node){
            var $node = $(node);
            var priceMinText = $node.parents(".priceRegion:first").find("input").eq(0).val();
            var priceMaxText = $node.parents(".priceRegion:first").find("input").eq(1).val();
            this.options.requestData[this.requestType].priceMin = priceMinText;
            this.options.requestData[this.requestType].priceMax = priceMaxText;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        ".resultCategory>a .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            if(parent.hasClass("brand")){
                delete this.options.requestData[this.requestType].brand;
            }else if(parent.hasClass("commodityCategory2")){
                delete this.options.requestData[this.requestType].commodityCategory2;
            }else if(parent.hasClass("commodityCategory3")){
                delete this.options.requestData[this.requestType].commodityCategory3;
            }else if(parent.hasClass("color")){
                delete this.options.requestData[this.requestType].color;
            }else if(parent.hasClass("size")){
                delete this.options.requestData[this.requestType].size;
            }else if(parent.hasClass("priceRegion")){
                delete this.options.requestData[this.requestType].priceMin;
                delete this.options.requestData[this.requestType].priceMax;
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },
        ".filter>.btn-group>a click": function(node) {
            var $node = $(node);
            delete this.options.requestData[this.requestType].hotUp;
            delete this.options.requestData[this.requestType].hotDown;
            delete this.options.requestData[this.requestType].priceUp;
            delete this.options.requestData[this.requestType].priceDown;
            delete this.options.requestData[this.requestType].createTimeUp;
            delete this.options.requestData[this.requestType].createTimeDown;
            if($node.hasClass("filterHot")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData[this.requestType].hotDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData[this.requestType].hotUp = 1;
                }
            }
            if($node.hasClass("filterPrice")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData[this.requestType].priceDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData[this.requestType].priceUp = 1;
                }
            }
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "commoditySearchList", responseData.obj.commoditySearchList
                        );
                    },this)
                )
        },

    })
});