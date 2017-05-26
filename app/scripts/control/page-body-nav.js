/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "comm.query.nav",
    "component.page.body.nav",
    "fixture.test"
], function($, _, can, queryNav){

    /** @description:  发起请求, 返回数据, 调用模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryNavAll": return queryNav.all();
                default: return can.Deferred().reject();
            }
        },

        render: function(data){
            this.options.templates = "<page-body-nav></page-body-nav>";
            this.options.data = data? new can.Map(data): {};
            this.element.html(can.mustache(this.options.templates)(this.options.data));
        },

        init: function(){
            can.when(
                this.sendRequest("queryNavAll")
            ).done(
                $.proxy(function(responseData){
                    this.render(responseData);
                },this)
            )
        }
    })

})