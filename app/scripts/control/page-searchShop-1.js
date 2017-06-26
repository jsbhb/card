/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.searchShop",
    "component.page.searchShop.1",
    "bower.css!css.page.searchShop.1",
    "fixture.test",
], function($, _, can, comm_searchShop){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryAll": return comm_searchShop.queryAll(this.options.urlData);
                case undefined:  return can.Deferred().resolve();
                default:         return can.Deferred().reject();
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
            this.options.templates = "<page-searchshop-1></page-searchshop-1>";
            this.element.html(
                can.mustache(this.options.templates)({ "SEARCHSHOP": this.options.renderData })
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
                can.when(this.sendRequest("queryAll"))
                    .done(
                        $.proxy(function(responseData){
                            if(responseData && responseData.success){
                                this.setRenderData(responseData.obj);
                            }else{
                                this.setRenderData(responseData);
                            }
                            this.render();
                        },this)
                    )
            }
        },
        "[brand] click": function(element){
            var text = element.find(">span").text();
            this.options.urlData.brand = text;
            can.when(this.sendRequest("queryAll"))
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
        "[commodityCategory2] click": function(element){
            var text = element.find(">span").text();
            this.options.urlData.commodityCategory2 = text;
            can.when(this.sendRequest("queryAll"))
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
        "[commodityCategory3] click": function(element){
            var text = element.find(">span").text();
            this.options.urlData.commodityCategory3 = text;
            can.when(this.sendRequest("queryAll"))
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
        "[color] click": function(element){
            var text = element.find(">span").text();
            this.options.urlData.color = text;
            can.when(this.sendRequest("queryAll"))
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
        "[size] click": function(element){
            var text = element.find(">span").text();
            this.options.urlData.size = text;
            can.when(this.sendRequest("queryAll"))
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
        ".priceRegion .priceRegionBtn click": function(element){
            var priceMinText = $(element).parents(".priceRegion:first").find("input").eq(0).val();
            var priceMaxText = $(element).parents(".priceRegion:first").find("input").eq(1).val();
            this.options.urlData.priceMin = priceMinText;
            this.options.urlData.priceMax = priceMaxText;
            can.when(this.sendRequest("queryAll"))
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
        ".resultCategory>a .deleteIcon click": function(element){
            var parent = element.parents("a:first");
            if(parent.hasClass("brand")){
                delete this.options.urlData.brand;
            }else if(parent.hasClass("commodityCategory2")){
                delete this.options.urlData.commodityCategory2;
            }else if(parent.hasClass("commodityCategory3")){
                delete this.options.urlData.commodityCategory3;
            }else if(parent.hasClass("color")){
                delete this.options.urlData.color;
            }else if(parent.hasClass("size")){
                delete this.options.urlData.size;
            }else if(parent.hasClass("priceRegion")){
                delete this.options.urlData.priceMin;
                delete this.options.urlData.priceMax;
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest("queryAll"))
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
        ".filter>.btn-group>a click": function(element) {
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
            can.when(this.sendRequest("queryAll"))
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
        ".ShopList>ul>li a click": function(element){
            var commodityid = element.attr("commodityid");
            var memberid = element.attr("memberid");
            if(commodityid == "1"){
                location.href = "/app/webpage/shop.html";
            }else if(commodityid == "2"){
                location.href = "/app/webpage/shop2.html";
            }else if(memberid == "1"){
                location.href = "/app/webpage/company.html";
            }
            if(memberid == "2"){
                location.href = "/app/webpage/company2.html";
            }
        }
    })
});