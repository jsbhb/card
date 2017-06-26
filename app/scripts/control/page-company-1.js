/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.company",
    "component.page.company.1",
    "bower.css!css.page.company.1",
    "fixture.test",
], function($, _, can, comm_company){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryAll":  return comm_company.queryAll(this.options.urlData);
                case "queryShop": return comm_company.queryShop(this.options.urlData);
                case undefined:   return can.Deferred().resolve();
                default:          return can.Deferred().reject();
            }
        },


        setRenderData: function(responseData){
            if(typeof this.options.config=="object"){
                this.options.renderData.attr("CONFIG", this.options.config);
            }
            if(typeof responseData == "object"){
                this.options.renderData.attr("RESPONSEDATA", responseData);
            }
        },


        render: function(){
            this.options.templates = "<page-company-1></page-company-1>";
            this.element.html(
                can.mustache(this.options.templates)({ "COMPANY": this.options.renderData })
            );
        },


        init: function(){
            this.options.config = this.options.config || {};
            this.options.urlData = this.options.urlData || {};
            this.options.responseData = this.options.responseData || null;
            this.options.renderData = new can.Model({ CONFIG:{}, RESPONSEDATA:{} });
            if(this.options.responseData){
                this.setRenderData(this.options.responseData);
                this.render();
            }else{
                can.when(this.sendRequest("queryAll"),this.sendRequest("queryShop"))
                    .done(
                        $.proxy(function(responseData1,responseData2){
                            if(responseData1 && responseData1.success){
                                this.setRenderData(responseData1.obj);
                                this.options.renderData.RESPONSEDATA.attr("queryShop",responseData2.obj);
                            }else{
                                this.setRenderData(responseData1);
                                this.options.renderData.RESPONSEDATA.attr("queryShop",responseData2);
                            }
                            this.render();
                        },this)
                    );
            }
        },
        ".shopClassify a click": function(element){
            var $parent = element.parents(".shopClassify:first");
            var text = $(element).text().trim();
            var b1 = $(element).hasClass("active");
            var b2 = $parent.hasClass("commodityCategory2");
            var b3 = $parent.hasClass("commodityCategory3");
            (!b1 && b2)&&(delete this.options.urlData.commodityCategory2);
            (b1 && b2) &&(this.options.urlData.commodityCategory2 = text);
            (!b1 && b3)&&(delete this.options.urlData.commodityCategory3);
            (b1 && b3) &&(this.options.urlData.commodityCategory3 = text);
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.queryShop.attr("commoditySearchList",responseData.obj.commoditySearchList);
                    },this)
                )
        },
        ".companySort a click": function(element) {
            delete this.options.urlData.hotUp;
            delete this.options.urlData.hotDown;
            delete this.options.urlData.priceUp;
            delete this.options.urlData.priceDown;
            delete this.options.urlData.createTimeUp;
            delete this.options.urlData.createTimeDown;
            if(element.hasClass("filterHot")){
                if(element.find(">i").hasClass("font-base_directionDown")){
                    this.options.urlData.hotDown = 1;
                }else if(element.find(">i").hasClass("font-base_directionUp")){
                    this.options.urlData.hotUp = 1;
                }
            }
            if(element.hasClass("filterPrice")){
                if(element.find(">i").hasClass("font-base_directionDown")){
                    this.options.urlData.priceDown = 1;
                }else if(element.find(">i").hasClass("font-base_directionUp")){
                    this.options.urlData.priceUp = 1;
                }
            }
            can.when(this.sendRequest("queryShop"))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.queryShop.attr("commoditySearchList",responseData.obj.commoditySearchList);
                    },this)
                )
        },
        ".page-company-content .toCommodity click": function(element){
            var memberid = $(".page-company-content").attr("memberid");
            var commodityid = $(element).attr("commodityid");
            location.href = encodeURI("/app/webpage/shop.html?memberid="+memberid+"&commodityid="+commodityid);
        }
    })
});