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
    "component.page.company.1",
    "bower.css!css.page.company.1"
], function($, can, common, Render, pagePagination1){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return Render.extend({
        //子类扩展
        template: "<page-company-1></page-company-1>",
        config: {},
        region: {
            company: {
                path: "RESPONSE",
                dynamic: false,
                beforeFunc: true,
                afterFunc: false
            },
            shop: {
                path: "RESPONSE/queryShop",
                dynamic: true,
                beforeFunc: false,
                afterFunc: function(that){
                    var queryShop = that.options.renderData.RESPONSE.queryShop;
                    var pagination = queryShop && queryShop.pagination;
                    if(pagination && pagination.totalPages>0){
                        that.pagination = new pagePagination1("page-company-1 #load-pagePagination",{
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
            queryCompany: {

            },
            queryShop: {
                "numPerPage": 6,
                "currentPage": 1
            }
        },
        requestType: [
            "queryCompany/company",
            "queryShop/shop"
        ],


        //自定义方法
        callback: function(currentPage){
            this.options.requestData.queryShop.currentPage = currentPage;
            this.toRender("queryShop/shop/commoditySearchList");
        },


        //自定义事件
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
            this.toRender("queryShop/shop/commoditySearchList");
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
            this.toRender("queryShop/shop/commoditySearchList");
        },
        ".page-company-content .toCommodity click": function(node){
            var $node = $(node);
            var memberId = $node.parents(".page-company-content:first").attr("memberId");
            var commodityId = $node.attr("memberId");
            window.open(encodeURI("/app/webpage/shop.html?memberId="+memberId+"&commodityId="+commodityId));
        }

    })

});