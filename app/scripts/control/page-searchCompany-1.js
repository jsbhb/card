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
    "component.page.searchCompany.1",
    "bower.css!css.page.searchCompany.1",
], function($, _, can, common, Render, controlPagePagination1){

    return Render.extend({
        //子类扩展
        requestType:   "querySearchCompany",
        templatesPath: "<page-searchcompany-1></page-searchcompany-1>",
        requestData: {
            querySearchCompany: {
                "numPerPage": 3,
                "currentPage": 1,
            }
        },
        renderAfterFun: function(){
            this.pagination = new controlPagePagination1("page-searchcompany-1 .load-pagePagination",{
                config: { direction: "floatRight" },
                parentObj: this,
            });
        },
        callback: function(){
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.options.renderData.RESPONSEDATA.attr(
                                "memberList", responseData.obj.memberList
                            );
                            this.pagination.setRenderData(responseData.obj.pagination);
                        }
                    },this)
                )
        },

        //事件
        "[industrymap] click": function(node){
            var $node = $(node);
            var index = $node.attr("industrymap");
            this.options.requestData[this.requestType]["industryList[0].industry"] = index;
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
        "[dictmap] click": function(node){
            var $node = $(node);
            var index = $node.attr("dictmap");
            this.options.requestData[this.requestType]["dictList[0].categoryDict"] = index;
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
        "[entrymap] click": function(node){
            var $node = $(node);
            var index = $node.attr("entrymap");
            this.options.requestData[this.requestType]["entryList[0].categoryEntry"] = index;
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
        ".resultCategory .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            if(parent.hasClass("industryItem")){
                delete this.options.requestData[this.requestType]["industryList[0].industry"];
            }else if(parent.hasClass("dictItem")){
                delete this.options.requestData[this.requestType]["dictList[0].categoryDict"];
            }else if(parent.hasClass("entryItem")){
                delete this.options.requestData[this.requestType]["entryList[0].categoryEntry"];
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
        ".filter>.btn-group>a click": function(node){
            var $node = $(node);
            if($node.hasClass("filterDefault")){
                delete this.options.requestData[this.requestType]["sortList[0].sortField"];
                delete this.options.requestData[this.requestType]["sortList[0].sortRule"];
            }
            if($node.hasClass("filterReputation")){
                this.options.requestData[this.requestType]["sortList[0].sortField"] = "reputation";
                this.options.requestData[this.requestType]["sortList[0].sortRule"] = "desc";
            }
            if($node.hasClass("filterCalendar")){
                this.options.requestData[this.requestType]["sortList[0].sortField"] = "enterTime";
                this.options.requestData[this.requestType]["sortList[0].sortRule"] = "desc";
            }
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
        ".inputGroup>label click": function(node){
            var $node = $(node);
            var $input = $node.next("input");
            var id = $input.attr("id");
            if($input.is(":checked")){
                id == "company_highQuality" && (delete this.options.requestData[this.requestType].highQuality);
                id == "company_guarantee" && (delete this.options.requestData[this.requestType].guarantee);
                id == "company_returnGoods" && (delete this.options.requestData[this.requestType].returnGoods);
                id == "company_sincerity" && (delete this.options.requestData[this.requestType].sincerity);
            }else{
                id == "company_highQuality" && (this.options.requestData[this.requestType].highQuality=1);
                id == "company_guarantee" && (this.options.requestData[this.requestType].guarantee=1);
                id == "company_returnGoods" && (this.options.requestData[this.requestType].returnGoods=1);
                id == "company_sincerity" && (this.options.requestData[this.requestType].sincerity=1);
            }
            can.when(this.sendRequest(this.requestType))
                .done(
                    $.proxy(function(responseData){
                        responseData &&
                        responseData.success &&
                        this.options.renderData.RESPONSEDATA.attr(
                            "memberList", responseData.obj.memberList
                        );
                    },this)
                )
        },
    })
});