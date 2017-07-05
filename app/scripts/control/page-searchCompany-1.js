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
    "component.page.searchCompany.1"
], function($, _, can, common, Render, controlPagePagination1){

    return Render.extend({
        //子类扩展
        requestType:   "querySearchCompany",
        templatesPath: "<page-searchcompany-1></page-searchcompany-1>",
        requestData: {
            querySearchCompany: {
                "numPerPage": 3,
                "currentPage": 1
            }
        },
        renderAfterFun: function(){
            this.pagination = new controlPagePagination1("page-searchcompany-1 .load-pagePagination",{
                config: { direction: "floatRight" },
                responseData: this.options.renderData.RESPONSEDATA.pagination,
                parentObj: this,
            });
        },


        callback: function(currentPage){
            this.options.requestData.querySearchCompany.currentPage = currentPage;
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                            this.pagination.setRenderData(responseData.obj.pagination);
                        }
                    },this)
                )
        },

        //事件
        "[industrymap] click": function(node){
            var $node = $(node);
            var index = $node.attr("industrymap");
            this.options.requestData.querySearchCompany["industryList[0].industry"] = index;
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
        "[dictmap] click": function(node){
            var $node = $(node);
            var index = $node.attr("dictmap");
            this.options.requestData.querySearchCompany["dictList[0].categoryDict"] = index;
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
        "[entrymap] click": function(node){
            var $node = $(node);
            var index = $node.attr("entrymap");
            this.options.requestData.querySearchCompany["entryList[0].categoryEntry"] = index;
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
        ".resultCategory .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            if(parent.hasClass("industryItem")){
                delete this.options.requestData.querySearchCompany["industryList[0].industry"];
            }else if(parent.hasClass("dictItem")){
                delete this.options.requestData.querySearchCompany["dictList[0].categoryDict"];
            }else if(parent.hasClass("entryItem")){
                delete this.options.requestData.querySearchCompany["entryList[0].categoryEntry"];
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
        ".filter>.btn-group>a click": function(node){
            var $node = $(node);
            if($node.hasClass("filterDefault")){
                delete this.options.requestData.querySearchCompany["sortList[0].sortField"];
                delete this.options.requestData.querySearchCompany["sortList[0].sortRule"];
            }
            if($node.hasClass("filterReputation")){
                this.options.requestData.querySearchCompany["sortList[0].sortField"] = "reputation";
                this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "desc";
            }
            if($node.hasClass("filterCalendar")){
                this.options.requestData.querySearchCompany["sortList[0].sortField"] = "enterTime";
                this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "desc";
            }
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
        ".inputGroup>label click": function(node){
            var $node = $(node);
            var $input = $node.next("input");
            var id = $input.attr("id");
            if($input.is(":checked")){
                id == "company_highQuality" && (delete this.options.requestData.querySearchCompany.highQuality);
                id == "company_guarantee" && (delete this.options.requestData.querySearchCompany.guarantee);
                id == "company_returnGoods" && (delete this.options.requestData.querySearchCompany.returnGoods);
                id == "company_sincerity" && (delete this.options.requestData.querySearchCompany.sincerity);
            }else{
                id == "company_highQuality" && (this.options.requestData.querySearchCompany.highQuality=1);
                id == "company_guarantee" && (this.options.requestData.querySearchCompany.guarantee=1);
                id == "company_returnGoods" && (this.options.requestData.querySearchCompany.returnGoods=1);
                id == "company_sincerity" && (this.options.requestData.querySearchCompany.sincerity=1);
            }
            can.when(this.sendRequest("querySearchCompany"))
                .done(
                    $.proxy(function(responseData){
                        if(responseData && responseData.success){
                            this.setRenderData(responseData.obj.memberList, ["memberList"]);
                        }
                    },this)
                )
        },
    })
});