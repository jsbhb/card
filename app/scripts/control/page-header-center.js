/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "component.page.header.center",
    "fixture.test"
], function($, _, can, Comm){

    /** @description:  发起请求, 返回数据, 调用模板组件, 并渲染输出
     */
    return can.Control.extend({

        sendRequest: function(type){

        },

        render: function(data){
            this.options.templates = "<page-header-center></page-header-center>";
            this.options.data = data? new can.Map(data): {};
            this.element.html(can.mustache(this.options.templates)(this.options.data));
        },

        init: function(){
            can.when(
                true
            ).done(
                $.proxy(function(responseData){
                    this.render(responseData);
                },this)
            )
        }
    })

})