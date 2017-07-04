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
        requestType:   ["queryCompany", "queryShop"],
        templatesPath: "<page-company-1></page-company-1>",
        requestData: {
            queryCompany: {},
            queryShop: {}
        },
        renderAfterFun: function(){
            can.when(this.sendRequest(this.requestType[1]))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.options.renderData.RESPONSEDATA.attr(this.requestType[1],responseData.obj);
                        }else{
                            this.options.renderData.RESPONSEDATA.attr(this.requestType[1],responseData);
                        }
                        this.render();
                        this.pagination = new controlPagePagination1("page-company-1 .load-pagePagination",{
                            config: { direction: "floatRight" },
                            parentObj: this,
                        });
                    },this)
                )
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
                        this.pagination.setRenderData(responseData.obj.pagination);
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
            (!b1 && b2)&&(delete this.options.requestData[this.requestType[1]].commodityCategory2);
            (b1 && b2) &&(this.options.requestData[this.requestType[1]].commodityCategory2 = text);
            (!b1 && b3)&&(delete this.options.requestData[this.requestType[1]].commodityCategory3);
            (b1 && b3) &&(this.options.requestData[this.requestType[1]].commodityCategory3 = text);
            can.when(this.sendRequest(this.requestType[1]))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.queryShop.attr("commoditySearchList",responseData.obj.commoditySearchList);
                    },this)
                )
        },
        ".companySort a click": function(node) {
            var $node = $(node);
            delete this.options.requestData[this.requestType[1]].hotUp;
            delete this.options.requestData[this.requestType[1]].hotDown;
            delete this.options.requestData[this.requestType[1]].priceUp;
            delete this.options.requestData[this.requestType[1]].priceDown;
            delete this.options.requestData[this.requestType[1]].createTimeUp;
            delete this.options.requestData[this.requestType[1]].createTimeDown;
            if($node.hasClass("filterHot")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData[this.requestType[1]].hotDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData[this.requestType[1]].hotUp = 1;
                }
            }
            if($node.hasClass("filterPrice")){
                if($node.find(">i").hasClass("font-base_directionDown")){
                    this.options.requestData[this.requestType[1]].priceDown = 1;
                }else if($node.find(">i").hasClass("font-base_directionUp")){
                    this.options.requestData[this.requestType[1]].priceUp = 1;
                }
            }
            can.when(this.sendRequest(this.requestType[1]))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.queryShop.attr("commoditySearchList",responseData.obj.commoditySearchList);
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