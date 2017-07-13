/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.banner.2"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        templates: "<page-banner-2></page-banner-2>",
        isDynamic: "NO"
    })

});