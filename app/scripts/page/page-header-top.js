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

    /** Model
     *   @description 模型
     *   @findCity  查询所在市区
     */
    var Model = new Comm({
        findCity: function(){
            return this.sendRequest({
                url: "/card/findCity",
                type: "get"
            })
        }
    });

    /** Component
     *   @description: 组件
     */
    can.Component.extend({
        tag: "page-header-top",
        scope: {
        },
        template: can.view("page-header-top.mustache"),
        helpers: {
        },
        events: {
        }
    })

    /** Control
     *   @description 控制
     *   @description: 发起请求，返回数据，处理模板并渲染输出
     *   @param:
     *      loadPage: 创建模板节点, 自动调用相应的模板组件
     *      mapData: 封装成can.Map类型的responseData数据, 以便起到监听作用, 实现动态渲染
     */
    var Control = can.Control.extend({
        init: function(){
            can.when(Model.findCity()).done(
                $.proxy(function(responseData){
                    this.options.loadPage = "<page-header-top></page-header-top>";
                    this.options.mapData = new can.Map(responseData);
                    this.element.html(can.mustache(this.options.loadPage)(this.options.mapData));
                },this)
            )
        }
    })

    new Control(".load-page-header-top");

});