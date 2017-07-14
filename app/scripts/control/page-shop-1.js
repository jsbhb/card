/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.shop.1",
    "bower.text!templates.page.shop.1.mustache",
    "bower.css!css.page.shop.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        templates: "<page-shop-1></page-shop-1>",
        requestType:   "queryShop",
        requestData: {
            queryShop: {}
        }
    })

});