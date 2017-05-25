/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "comm.model",
    "fixture.test"
], function($, _, can, Comm){

    /** Component
     *   @description: 组件
     */
    can.Component.extend({
        tag: "page-header-center",
        scope: {
        },
        template: can.view("page-header-center.mustache"),
        helpers: {
        },
        events: {
        }
    })


    /** Control
     *   @description: 发起请求，返回数据，处理模板并渲染输出
     *   @parameter:
     *       loadPage: 创建模板节点, 自动调用相应的模板组件
     *       mapData: 封装成can.Map类型的responseData数据, 以便起到监听作用, 实现动态渲染
     */
    var Control = can.Control.extend({
        init: function(){
            can.when(true).done(
                $.proxy(function(responseData){
                    this.options.loadPage = "<page-header-center></page-header-center>";
                    this.options.mapData = new can.Map(responseData);
                    this.element.html(can.mustache(this.options.loadPage)(this.options.mapData));
                },this)
            )
        }
    })

    new Control(".load-page-header-center");

})