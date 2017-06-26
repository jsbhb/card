/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.searchCompany",
    "component.page.searchCompany.1",
    "bower.css!css.page.searchCompany.1",
    "fixture.test",
], function($, _, can, comm_searchCompany){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryAll": return comm_searchCompany.queryAll(this.options.urlData);
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
            this.options.templates = "<page-searchcompany-1></page-searchcompany-1>";
            this.element.html(
                can.mustache(this.options.templates)({ "SEARCHCOMPANY": this.options.renderData })
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
        "[industrymap] click": function(element){
            var index = element.attr("industrymap");
            this.options.urlData["industryList[0].industry"] = index;
            can.when(this.sendRequest("queryAll"))
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
        "[dictmap] click": function(element){
            var index = element.attr("entrymap");
            this.options.urlData["dictList[0].categoryDict"] = index;
            can.when(this.sendRequest("queryAll"))
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
        "[entrymap] click": function(element){
            var index = element.attr("entrymap");
            this.options.urlData["entryList[0].categoryEntry"] = index;
            can.when(this.sendRequest("queryAll"))
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
        ".resultCategory .deleteIcon click": function(element){
            var parent = element.parents("a:first");
            if(parent.hasClass("industryItem")){
                delete this.options.urlData["industryList[0].industry"];
            }else if(parent.hasClass("dictItem")){
                delete this.options.urlData["dictList[0].categoryDict"];
            }else if(parent.hasClass("entryItem")){
                delete this.options.urlData["entryList[0].categoryEntry"];
            }
            parent.next("i").remove();
            parent.remove();
            can.when(this.sendRequest("queryAll"))
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
        ".filter>.btn-group>a click": function(element){
            if(element.hasClass("filterDefault")){
                delete this.options.urlData["sortList[0].sortField"];
                delete this.options.urlData["sortList[0].sortRule"];
            }
            if(element.hasClass("filterReputation")){
                this.options.urlData["sortList[0].sortField"] = "reputation";
                this.options.urlData["sortList[0].sortRule"] = "desc";
            }
            if(element.hasClass("filterCalendar")){
                this.options.urlData["sortList[0].sortField"] = "enterTime";
                this.options.urlData["sortList[0].sortRule"] = "desc";
            }
            can.when(this.sendRequest("queryAll"))
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
        ".inputGroup>label click": function(element){
            var $element = element.next("input");
            var id = $element.attr("id");
            if($element.is(":checked")){
                id == "company_highQuality" && (delete this.options.urlData.highQuality);
                id == "company_guarantee" && (delete this.options.urlData.guarantee);
                id == "company_returnGoods" && (delete this.options.urlData.returnGoods);
                id == "company_sincerity" && (delete this.options.urlData.sincerity);
            }else{
                id == "company_highQuality" && (this.options.urlData.highQuality=1);
                id == "company_guarantee" && (this.options.urlData.guarantee=1);
                id == "company_returnGoods" && (this.options.urlData.returnGoods=1);
                id == "company_sincerity" && (this.options.urlData.sincerity=1);
            }
            can.when(this.sendRequest("queryAll"))
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
        ".companyList>ul>li a click": function(element){
            var memberid = element.attr("memberid");
            location.href = encodeURI("/app/webpage/company.html?memberid="+memberid);
        }
    })
});