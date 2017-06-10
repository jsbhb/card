/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.shop.1",
    "component.page.shop.2",
    "bower.css!css.page.shop.2",
    "fixture.test",
], function($, _, can, comm){

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
            this.options.templates = "<page-shop-2></page-shop-2>";
            this.element.html(
                can.mustache(this.options.templates)({
                    "page-shop-2": this.options.renderData
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
                can.when(this.sendRequest())
                    .done(
                        $.proxy(function(responseData){
                            this.render(responseData);
                        },this)
                    )
            }
        },

        "[industrymap] click": function(element){

        },

        "[categorymap] click": function(element){

        },
        ".resultCategory>a .deleteIcon click": function(element){

        },
        ".filter>.btn-group>a click": function(element){
            if(element.hasClass("filterDefault")){

            }
            if(element.hasClass("filterReputation")){

            }
            if(element.hasClass("filterCalendar")){

            }
        },
        ".inputGroup>label click": function(element){

        }

    })
});