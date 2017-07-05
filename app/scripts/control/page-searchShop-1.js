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
    "component.page.searchShop.1"
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
                responseData: this.options.renderData.RESPONSEDATA.pagination,
                parentObj: this,
            });
        },
        callback: function(currentPage){
            this.options.requestData.querySearchShop.currentPage = currentPage;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                            this.pagination.setRenderData(responseData.obj.pagination);
                        }
                    },this)
                )
        },

        //事件
        "[brand] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData.querySearchShop.brand = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        "[commodityCategory2] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData.querySearchShop.commodityCategory2 = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        "[commodityCategory3] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData.querySearchShop.commodityCategory3 = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        "[color] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData.querySearchShop.color = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        "[size] click": function(node){
            var $node = $(node);
            var text = $node.find(">span").text();
            this.options.requestData.querySearchShop.size = text;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        ".priceRegion .priceRegionBtn click": function(node){
            var $node = $(node);
            var priceMinText = $node.parents(".priceRegion:first").find("input").eq(0).val();
            var priceMaxText = $node.parents(".priceRegion:first").find("input").eq(1).val();
            this.options.requestData.querySearchShop.priceMin = priceMinText;
            this.options.requestData.querySearchShop.priceMax = priceMaxText;
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        ".resultCategory>a .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            if(parent.hasClass("brand")){
                delete this.options.requestData.querySearchShop.brand;
            }else if(parent.hasClass("commodityCategory2")){
                delete this.options.requestData.querySearchShop.commodityCategory2;
            }else if(parent.hasClass("commodityCategory3")){
                delete this.options.requestData.querySearchShop.commodityCategory3;
            }else if(parent.hasClass("color")){
                delete this.options.requestData.querySearchShop.color;
            }else if(parent.hasClass("size")){
                delete this.options.requestData.querySearchShop.size;
            }else if(parent.hasClass("priceRegion")){
                delete this.options.requestData.querySearchShop.priceMin;
                delete this.options.requestData.querySearchShop.priceMax;
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },
        ".filter>.btn-group>a click": function(node) {
            var $node = $(node);
            delete this.options.requestData.querySearchShop.hotUp;
            delete this.options.requestData.querySearchShop.hotDown;
            delete this.options.requestData.querySearchShop.priceUp;
            delete this.options.requestData.querySearchShop.priceDown;
            delete this.options.requestData.querySearchShop.createTimeUp;
            delete this.options.requestData.querySearchShop.createTimeDown;
            if($node.hasClass("filterHot")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData.querySearchShop.hotDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData.querySearchShop.hotUp = 1;
                }
            }
            if($node.hasClass("filterPrice")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData.querySearchShop.priceDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData.querySearchShop.priceUp = 1;
                }
            }
            can.when(this.sendRequest("querySearchShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["commoditySearchList"]);
                        }
                    },this)
                )
        },

    })
});