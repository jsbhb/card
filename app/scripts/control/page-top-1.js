/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.top.1",
    "bower.text!templates.page.top.1.mustache",
    "bower.css!css.page.top.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        templates: "<page-top-1></page-top-1>",
        isDynamic: "NO"
    })

});