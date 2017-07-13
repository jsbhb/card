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
], function($, _, can, common, Render, pagePagination1){

    return Render.extend({
        //子类扩展
        config: {
            industryName: null,
            dictName: null,
            entryName: null,
            filterDefault: { active:true, down: true },
            filterReputation: { active:null, down: true },
            filterCalendar:{ active:null, down: true },
            highQuality: false,
            sincerity: false,
            returnGoods: false,
            guarantee: false
        },
        templates: "<page-searchcompany-1></page-searchcompany-1>",
        requestType:   "querySearchCompany",
        requestData: {
            querySearchCompany: {
                "numPerPage": 10,
                "currentPage": 1
            }
        },
        renderAfterFunc: function(){
            var pagination = this.options.renderData.RESPONSE.pagination;
            if(pagination && pagination.totalPages>0){
                this.pagination = new pagePagination1("page-searchcompany-1 #load-pagePagination",{
                    config: { direction: "floatRight" },
                    responseData: pagination || null,
                    parentObj: this
                });
            }
        },


        //自定义方法
        callback: function(currentPage){
            this.options.requestData.querySearchCompany.currentPage = currentPage;
            this.toRender("querySearchCompany");
        },


        //事件
        "[industryMap] click": function(node){
            var $node = $(node);
            var index = $node.attr("industryMap");
            var content = $node.find(">span").text();
            this.options.config["industryName"] = content;
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            this.options.requestData.querySearchCompany["industryList[0].industry"] = index;
            this.toRender("querySearchCompany");
        },
        "[dictMap] click": function(node){
            var $node = $(node);
            var index = $node.attr("dictMap");
            var content = $node.find(">span").text();
            this.options.config["dictName"] = content;
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            this.options.requestData.querySearchCompany["dictList[0].categoryDict"] = index;
            this.toRender("querySearchCompany");
        },
        "[entryMap] click": function(node){
            var $node = $(node);
            var index = $node.attr("entryMap");
            var content = $node.find(">span").text();
            this.options.config["entryName"] = content;
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            this.options.requestData.querySearchCompany["entryList[0].categoryEntry"] = index;
            this.toRender("querySearchCompany");
        },
        ".resultCategory .deleteIcon click": function(node){
            var $node = $(node);
            var parent = $node.parents("a:first");
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            if(parent.hasClass("industry")){
                this.options.config["industryName"] = null;
                delete this.options.requestData.querySearchCompany["industryList[0].industry"];
            }
            if(parent.hasClass("dict")){
                this.options.config["dictName"] = null;
                delete this.options.requestData.querySearchCompany["dictList[0].categoryDict"];
            }
            if(parent.hasClass("entry")){
                this.options.config["entryName"] = null;
                delete this.options.requestData.querySearchCompany["entryList[0].categoryEntry"];
            }
            this.toRender("querySearchCompany");
        },
        ".filter>.btn-group>a click": function(node){
            var $node = $(node);
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            if($node.hasClass("filterDefault")){
                delete this.options.requestData.querySearchCompany["sortList[0].sortField"];
                delete this.options.requestData.querySearchCompany["sortList[0].sortRule"];
                this.options.config.filterDefault.active = true;
                this.options.config.filterReputation.active = false;
                this.options.config.filterCalendar.active = false;
            }
            if($node.hasClass("filterReputation")){
                if(this.options.config.filterReputation.active){
                    this.options.config.filterReputation.down = !this.options.config.filterReputation.down;
                }
                this.options.config.filterReputation.down?
                    this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "desc":
                    this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "asc";
                this.options.requestData.querySearchCompany["sortList[0].sortField"] = "reputation";
                this.options.config.filterDefault.active = false;
                this.options.config.filterReputation.active = true;
                this.options.config.filterCalendar.active = false;
            }
            if($node.hasClass("filterCalendar")){
                if(this.options.config.filterCalendar.active){
                    this.options.config.filterCalendar.down = !this.options.config.filterCalendar.down;
                }
                this.options.config.filterCalendar.down?
                    this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "desc":
                    this.options.requestData.querySearchCompany["sortList[0].sortRule"] = "asc";
                this.options.requestData.querySearchCompany["sortList[0].sortField"] = "enterTime";
                this.options.config.filterDefault.active = false;
                this.options.config.filterReputation.active = false;
                this.options.config.filterCalendar.active = true;
            }
            this.toRender("querySearchCompany");
        },
        ".inputGroup>label click": function(node){
            var $node = $(node);
            var $input = $node.next("input");
            var id = $input.attr("id");
            this.options.requestData.querySearchCompany["currentPage"] = 1;
            if($input.is(":checked")){
                if(id == "company_highQuality"){
                    this.options.config.highQuality = false;
                    delete this.options.requestData.querySearchCompany.highQuality
                }
                if(id == "company_guarantee"){
                    this.options.config.guarantee = false;
                    delete this.options.requestData.querySearchCompany.guarantee;
                }
                if(id == "company_returnGoods"){
                    this.options.config.returnGoods = false;
                    delete this.options.requestData.querySearchCompany.returnGoods;
                }
                if(id == "company_sincerity"){
                    this.options.config.sincerity = false;
                    delete this.options.requestData.querySearchCompany.sincerity;
                }
            }
            else{
                if(id == "company_highQuality"){
                    this.options.config.highQuality = true;
                    this.options.requestData.querySearchCompany.highQuality=1;
                }
                if(id == "company_guarantee"){
                    this.options.config.guarantee = true;
                    this.options.requestData.querySearchCompany.guarantee=1;
                }
                if(id == "company_returnGoods"){
                    this.options.config.returnGoods = true;
                    this.options.requestData.querySearchCompany.returnGoods=1;
                }
                if(id == "company_sincerity"){
                    this.options.config.sincerity = true;
                    this.options.requestData.querySearchCompany.sincerity=1;
                }
            }
            this.toRender("querySearchCompany");
        }
    })
});