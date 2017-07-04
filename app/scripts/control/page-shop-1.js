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
    "component.page.shop.1"
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        requestType:   "queryShop",
        templatesPath: "<page-shop-1></page-shop-1>",
        requestData: {
            queryShop: {}
        }
    })

});