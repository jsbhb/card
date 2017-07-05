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
    "component.page.company.1"
], function($, _, can, common, Render, controlPagePagination1){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return Render.extend({
        //子类扩展
        requestType:   "queryCompany",
        templatesPath: "<page-company-1></page-company-1>",
        requestData: {
            queryCompany: {},
            queryShop: {}
        },
        renderAfterFun: function(){
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj, ["queryShop"]);
                        }
                        console.log(this)
                        this.pagination = new controlPagePagination1("page-company-1 .load-pagePagination",{
                            config: { direction: "floatRight" },
                            responseData: this.options.renderData.RESPONSEDATA.queryShop.pagination,
                            parentObj: this,
                        });
                    },this)
                )
        },
        callback: function(){
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["queryShop", "commoditySearchList"]);
                            this.pagination.setRenderData(responseData.obj.pagination);
                        }
                    },this)
                )
        },

        //事件
        ".shopClassify a click": function(node){
            var $node = $(node);
            var $parent = $node.parents(".shopClassify:first");
            var text = $node.text().trim();
            var b1 = $node.hasClass("active");
            var b2 = $parent.hasClass("commodityCategory2");
            var b3 = $parent.hasClass("commodityCategory3");
            (!b1 && b2)&&(delete this.options.requestData.queryShop.commodityCategory2);
            (b1 && b2) &&(this.options.requestData.queryShop.commodityCategory2 = text);
            (!b1 && b3)&&(delete this.options.requestData.queryShop.commodityCategory3);
            (b1 && b3) &&(this.options.requestData.queryShop.commodityCategory3 = text);
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["queryShop", "commoditySearchList"]);
                        }
                    },this)
                )
        },
        ".companySort a click": function(node) {
            var $node = $(node);
            delete this.options.requestData.queryShop.hotUp;
            delete this.options.requestData.queryShop.hotDown;
            delete this.options.requestData.queryShop.priceUp;
            delete this.options.requestData.queryShop.priceDown;
            delete this.options.requestData.queryShop.createTimeUp;
            delete this.options.requestData.queryShop.createTimeDown;
            if($node.hasClass("filterHot")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData.queryShop.hotDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData.queryShop.hotUp = 1;
                }
            }
            if($node.hasClass("filterPrice")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData.queryShop.priceDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData.queryShop.priceUp = 1;
                }
            }
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.commoditySearchList, ["queryShop", "commoditySearchList"]);
                        }
                    },this)
                )
        },
        ".page-company-content .toCommodity click": function(node){
            var $node = $(node);
            var memberid = $node.parents(".page-company-content:first").attr("memberid");
            var commodityid = $node.attr("commodityid");
            window.open(encodeURI("/app/webpage/shop.html?memberid="+memberid+"&commodityid="+commodityid));
        }
    })
});