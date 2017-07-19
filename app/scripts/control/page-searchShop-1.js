/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "control.page.pagination.1",
    "component.page.searchShop.1",
    "bower.css!css.page.searchShop.1"
], function($, can, common, Render, pagePagination1){

    return Render.extend({
        template: "<page-searchshop-1></page-searchshop-1>",
        //子类扩展
        config: {
            brand: null,
            commodityCategory2: null,
            commodityCategory3: null,
            color: null,
            size: null,
            priceMin: null,
            priceMax: null,
            priceRegion: null,
            filterDefault: { active:true, down: true },
            filterHot: { active:null, down: true },
            filterPrice:{ active:null, down: true }
        },
        region: {
            searchShop: {
                path: "RESPONSE",
                dynamic: true,
                afterFunc: function(that){
                    var pagination = that.options.renderData.RESPONSE.pagination;
                    if(pagination && pagination.totalPages>0){
                        that.pagination = new pagePagination1("page-searchshop-1 #load-pagePagination",{
                            config: {
                                direction: "floatRight"
                            },
                            response: {
                                data: pagination || null,
                                region: "pagination"
                            },
                            parentObj: that
                        });
                    }
                }
            }
        },
        requestData: {
            querySearchShop: {
                "numPerPage": 10,
                "currentPage": 1
            }
        },
        requestType: [
            "querySearchShop/searchShop"
        ],


        //自定义方法
        callback: function(currentPage){
            this.options.requestData.querySearchShop.currentPage = currentPage;
            this.toRender("querySearchShop/searchShop");
        },


        //自定义事件
        "[brand] click": function(node){
            var $node = $(node);
            var content = $node.find(">span").text();
            this.options.config.brand = content;
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.requestData.querySearchShop["brand"] = content;
            this.toRender("querySearchShop/searchShop");
        },
        "[commodityCategory2] click": function(node){
            var $node = $(node);
            var content = $node.find(">span").text();
            this.options.config.commodityCategory2 = content;
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.requestData.querySearchShop["commodityCategory2"] = content;
            this.toRender("querySearchShop/searchShop");
        },
        "[commodityCategory3] click": function(node){
            var $node = $(node);
            var content = $node.find(">span").text();
            this.options.config.commodityCategory3 = content;
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.requestData.querySearchShop["commodityCategory3"] = content;
            this.toRender("querySearchShop/searchShop");
        },
        "[color] click": function(node){
            var $node = $(node);
            var content = $node.find(">span").text();
            this.options.config.color = content;
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.requestData.querySearchShop.color = content;
            this.toRender("querySearchShop/searchShop");
        },
        "[size] click": function(node){
            var $node = $(node);
            var content = $node.find(">span").text();
            this.options.config.size = content;
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.requestData.querySearchShop.size = content;
            this.toRender("querySearchShop/searchShop");
        },
        ".priceRegion .priceRegionBtn click": function(node){
            var $node = $(node);
            var minText = $node.parents(".priceRegion:first").find("input").eq(0).val().trim();
            var maxText = $node.parents(".priceRegion:first").find("input").eq(1).val().trim();
            var priceMax, priceMin, priceRegion;
            if(minText!="" && maxText!=""){
                var bool = maxText*1 >= minText*1;
                priceMax = bool? maxText: minText;
                priceMin = bool? minText: maxText;
                priceRegion = "￥" + priceMin + "-" + priceMax;
            }
            else if(minText=="" && maxText!=""){
                priceMax = maxText;
                priceMin = 0;
                priceRegion = "￥" + priceMin + "-" + priceMax;
            }
            else if(maxText=="" && minText!=""){
                priceMax = null;
                priceMin = minText;
                priceRegion = "￥" + priceMin + "以上";
            }
            else if(maxText=="" && maxText==""){
                priceMax = null;
                priceMin = null;
                priceRegion = null;
            }
            this.options.requestData.querySearchShop["currentPage"] = 1;
            this.options.config.priceMax = priceMax;
            this.options.config.priceMin = priceMin;
            this.options.config.priceRegion = priceRegion;
            priceMin!=null?
                this.options.requestData.querySearchShop.priceMin = priceMin:
                delete this.options.requestData.querySearchShop.priceMin;
            priceMax!=null?
                this.options.requestData.querySearchShop.priceMax = priceMax:
                delete this.options.requestData.querySearchShop.priceMax;
            this.toRender("querySearchShop/searchShop");
        },
        ".resultCategory>a .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            if(parent.hasClass("brand")){
                this.options.config.brand = null;
                delete this.options.requestData.querySearchShop.brand;
            }else if(parent.hasClass("commodityCategory2")){
                this.options.config.commodityCategory2 = null;
                delete this.options.requestData.querySearchShop.commodityCategory2;
            }else if(parent.hasClass("commodityCategory3")){
                this.options.config.commodityCategory3 = null;
                delete this.options.requestData.querySearchShop.commodityCategory3;
            }else if(parent.hasClass("color")){
                this.options.config.color = null;
                delete this.options.requestData.querySearchShop.color;
            }else if(parent.hasClass("size")){
                this.options.config.size = null;
                delete this.options.requestData.querySearchShop.size;
            }else if(parent.hasClass("priceRegion")){
                this.options.config.priceMin = null;
                this.options.config.priceMax = null;
                delete this.options.requestData.querySearchShop.priceMin;
                delete this.options.requestData.querySearchShop.priceMax;
            }
            this.toRender("querySearchShop/searchShop");
        },
        ".filter>.btn-group>a click": function(node) {
            var $node = $(node);
            delete this.options.requestData.querySearchShop.hotUp;
            delete this.options.requestData.querySearchShop.hotDown;
            delete this.options.requestData.querySearchShop.priceUp;
            delete this.options.requestData.querySearchShop.priceDown;
            delete this.options.requestData.querySearchShop.createTimeUp;
            delete this.options.requestData.querySearchShop.createTimeDown;
            if($node.hasClass("filterDefault")){
                this.options.config.filterDefault.active = true;
                this.options.config.filterHot.active = false;
                this.options.config.filterPrice.active = false;
            }
            if($node.hasClass("filterHot")){
                if(this.options.config.filterHot.active){
                    this.options.config.filterHot.down = !this.options.config.filterHot.down;
                }
                this.options.config.filterHot.down?
                    this.options.requestData.querySearchShop.hotDown = 1:
                    this.options.requestData.querySearchShop.hotUp = 1;
                this.options.config.filterDefault.active = false;
                this.options.config.filterHot.active = true;
                this.options.config.filterPrice.active = false;
            }
            if($node.hasClass("filterPrice")){
                if(this.options.config.filterPrice.active){
                    this.options.config.filterPrice.down = !this.options.config.filterPrice.down;
                }
                this.options.config.filterPrice.down?
                    this.options.requestData.querySearchShop.priceDown = 1:
                    this.options.requestData.querySearchShop.priceUp = 1;
                this.options.config.filterDefault.active = false;
                this.options.config.filterHot.active = false;
                this.options.config.filterPrice.active = true;
            }
            this.toRender("querySearchShop/searchShop");
        }

    })

});