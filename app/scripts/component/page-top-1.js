/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-top-1",
        template: can.view("templates.page.top.1.mustache"),
        helpers: {
        },
        scope: {
        },
        events: {
        }
    })

});