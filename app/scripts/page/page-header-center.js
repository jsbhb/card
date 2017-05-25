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
        tag: "load-page-header-center",
        scope: {
        },
        template: can.view("page-header-center.mustache"),
        helpers: {
        },
        events: {
        }
    })

    /** 加载js时
     *   @description: 处理模板并渲染输出
     */
    $(".load-page-header-center").html(can.mustache("<load-page-header-center></load-page-header-center>"));

})