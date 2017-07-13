/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.top.1"
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templates: "<page-top-1></page-top-1>",
        isDynamic: "NO"
    })

});