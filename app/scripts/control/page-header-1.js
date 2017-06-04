/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "component.page.header.1",
    "bower.css!css.page.header.1",
    "fixture.test"
], function($, _, can){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case undefined:  return can.Deferred().resolve;
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
        }

    })

})