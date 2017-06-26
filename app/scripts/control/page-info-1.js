/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "component.page.info.1",
    "bower.css!css.page.info.1",
    "fixture.test",
], function($, _, can){

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
            this.options.templates = "<page-info-1></page-info-1>";
            this.element.html(
                can.mustache(this.options.templates)({ "INFO": this.options.renderData })
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
                            this.render(responseData);
                        },this)
                    )
            }

        }

    })
});