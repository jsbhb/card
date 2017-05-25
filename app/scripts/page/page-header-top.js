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
        tag: "load-page-header-top",
        scope: {
        },
        template: can.view("page-header-top.mustache"),
        helpers: {
        },
        events: {
        }
    })

    /** 加载js时
     *   @description: 发起请求，返回数据，处理模板并渲染输出
     */
    can.when(Model.findCity()).done(function(responseData){
        $(".load-page-header-top").html(
            can.mustache("<load-page-header-top></load-page-header-top>")(responseData)
        );
    })

});