/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.infoB",
    "component.page.body.infoB",
    "fixture.test"
], function($, _, can, infoB){

    /** @description:  发起请求, 返回数据, 调用模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){
            switch(type){
                case "queryAll": return infoB.queryAll();
                default: return can.Deferred().reject();
            }
        },

        render: function(data){
            this.options.templates = "<page-body-infob></page-body-infob>";
            this.options.data = data || {};
            this.element.html(can.mustache(this.options.templates)(this.options.data));
        },

        init: function(){
            can.when(
                this.sendRequest("queryAll")
            ).done(
                $.proxy(function(responseData){
                    this.render(responseData);
                },this)
            )
        }
    })

})