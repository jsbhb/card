/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.text!template.page.footer.1.mustache"
], function($, can, template){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-footer-1",
        template: template,
        helpers: {
        },
        scope: {
        },
        events: {
        }
    })

});