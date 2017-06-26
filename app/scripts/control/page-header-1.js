/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "control.page.searchCompany.1",
    "control.page.searchShop.1",
    "component.page.header.1",
    "bower.css!css.page.header.1",
    "fixture.test"
], function($, _, can, controlSearchCompany1, controlSearchShop1){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
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
            this.options.templates = "<page-header-1></page-header-1>";
            this.element.html(
                can.mustache(this.options.templates)({ "PAGEHEADER": this.options.renderData })
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
                can.when(this.sendRequest())
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


        ".btn-search click": function(elemenet){
            var $element = this.element;
            var $thisElemenet = $(elemenet);
            var searchType = $thisElemenet.parents(".page-header-search").find("[searchType]").attr("searchType");
            var searchText = $element.find(".input-search").val().trim();
            if(!searchText){
                 return false;
            }else if(searchType == "1"){
                if(location.pathname!= "/app/webpage/searchCompany.html"){
                    location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+searchText);
                }else{
                    new controlSearchCompany1(".load-searchCompany1", {
                        config: { searchText: searchText },
                        urlData: { memberName: searchText }
                    });
                }
            }else if(searchType == "2"){
                if(location.pathname!= "/app/webpage/searchShop.html"){
                    location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+searchText);
                }else{
                    new controlSearchShop1(".load-searchShop1", {
                        config: { searchText: searchText },
                        urlData: { commodityName: searchText }
                    });
                }
            }
        }

    })

})