/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.searchCompany.1",
    "component.page.searchCompany.1",
    "bower.css!css.page.searchCompany.1",
    "fixture.test",
], function($, _, can, comm){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryAll": return comm.queryAll(this.options.urlData);
                case undefined:  return can.Deferred().resolve(new can.Model({}));
                default:         return can.Deferred().reject();
            }
        },

        render: function(data){
            data && data.success && $.extend(true, this.options.renderData, data.obj);
            this.options.templates = "<page-searchcompany-1></page-searchcompany-1>";
            this.element.html(
                can.mustache(this.options.templates)({
                    "page-searchCompany-1": this.options.renderData
                })
            );
        },

        init: function(){

            this.options.directRender=  this.options.config && this.options.config.directRender || false;
            this.options.renderData= this.options.config && this.options.config.renderData || {};
            this.options.urlData= this.options.config && this.options.config.urlData || {};

            if(this.options.directRender){
                this.render();
            }else{
                can.when(this.sendRequest("queryAll"))
                    .done(
                        $.proxy(function(responseData){
                            this.render(responseData);
                        },this)
                    )
            }
        },

        "[industrymap] click": function(element){
            var index = element.attr("industrymap");
            this.options.urlData["dictList[0].categoryDict"] = index;
            can.when(this.sendRequest("queryAll"))
                .done(
                    $.proxy(function(responseData){
                        responseData.obj &&
                        this.options.renderData.attr("memberList", responseData.obj.memberList);
                    },this)
                )
        },

        "[categorymap] click": function(element){
            var index = element.attr("categorymap");
            this.options.urlData["entryList[0].categoryEntry"] = index;
            can.when(this.sendRequest("queryAll"))
                .done(
                    $.proxy(function(responseData){
                        responseData.obj &&
                        this.options.renderData.attr("memberList", responseData.obj.memberList);
                    },this)
                )
        },
        ".resultCategory .deleteIcon click": function(element){
            var parent = element.parents("a:first");
            if(parent.hasClass("industryItem")){
                delete this.options.urlData["dictList[0].categoryDict"];
            }else if(parent.hasClass("categoryItem")){
                delete this.options.urlData["entryList[0].categoryEntry"];
            }
            can.when(this.sendRequest("queryAll"))
                .done(
                    $.proxy(function(responseData){
                        responseData.obj &&
                        this.options.renderData.attr("memberList", responseData.obj.memberList);
                    },this)
                )
            parent.next("i").remove();
            parent.remove();
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
                        responseData.obj &&
                        this.options.renderData.attr("memberList", responseData.obj.memberList);
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
                        responseData.obj &&
                        this.options.renderData.attr("memberList", responseData.obj.memberList);
                    },this)
                )
        },
        ".companyList>ul>li a click": function(element){
            var memberid = element.attr("memberid");
            if(memberid == "1"){
                location.href = "/app/webpage/company.html";
            }
            if(memberid == "2"){
                location.href = "/app/webpage/company2.html";
            }
        }
    })
});