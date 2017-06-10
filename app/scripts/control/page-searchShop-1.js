/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.searchShop.1",
    "component.page.searchShop.1",
    "bower.css!css.page.searchShop.1",
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
            this.options.templates = "<page-searchshop-1></page-searchshop-1>";
            this.element.html(
                can.mustache(this.options.templates)({
                    "page-searchShop-1": this.options.renderData
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