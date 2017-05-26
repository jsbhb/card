/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-header-center",
        template: can.view("templates.page.header.center.mustache"),
        scope: {
        },
        helpers: {
        },
        events: {
        }
    })

})