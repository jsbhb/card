/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-header-top",
        template: can.view("templates.page.header.top.mustache"),
        scope: {
        },
        helpers: {
        },
        events: {
        }
    })

});