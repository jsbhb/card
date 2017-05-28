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
        tag: "page-body-nav",
        template: can.view("templates.page.body.nav.mustache"),
        helpers: {
        },
        scope: {
        },
        events: {
            ".itemBriefly li mouseenter": function(elements, event){
            },
            ".navContent, .itemDetails mouseleave": function(elements, event){
            }
        }
    })

})