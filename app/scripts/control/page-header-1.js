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
                case undefined:  return can.Deferred().resolve(new can.Model({}));
                default:         return can.Deferred().reject();
            }
        },

        render: function(data){
            data && data.success && $.extend(true, this.options.renderData, data.obj);
            this.options.templates = "<page-header-1></page-header-1>";
            this.element.html(
                can.mustache(this.options.templates)({
                    "page-header-1": this.options.renderData
                })
            );
        },

        init: function(){

            this.options.directRender=  this.options.config && this.options.config.directRender || false;
            this.options.renderData= this.options.config && this.options.config.renderData || {};

            if(this.options.directRender){
                this.render();
            }else{
                can.when(this.sendRequest())
                    .done(
                        $.proxy(function(responseData){
                            this.render(responseData);
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
                        config:{
                            directRender: false,
                            urlData: { memberName: searchText, }
                        }
                    });
                }
            }else if(searchType == "2"){
                if(location.pathname!= "/app/webpage/searchShop.html"){
                    location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+searchText);
                }else{
                    new controlSearchShop1(".load-searchShop1", {
                        config:{
                            directRender: false,
                            urlData: { commodityName: searchText, }
                        }
                    });
                }
            }
        }

    })

})