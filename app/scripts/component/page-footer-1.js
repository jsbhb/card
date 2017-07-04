/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "bower.css!css.page.footer.1"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-footer-1",
        template: can.view("templates.page.footer.1.mustache"),
        helpers: {
        },
        scope: {
        },
        events: {
        }
    })

});