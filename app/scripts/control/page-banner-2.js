/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.banner.2",
    "bower.text!templates.page.banner.2.mustache",
    "bower.css!css.page.banner.2"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-banner-2></page-banner-2>",
        config: {},
        region: {},
        requestData: {},
        requestType: []


        //自定义方法


        //自定义事件

    })

});