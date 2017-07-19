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
    "bower.css!css.page.shop.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-shop-1></page-shop-1>",
        config: {},
        region: {
            shop: {
                path: "RESPONSE",
                dynamic: true
            }
        },
        requestData: {
            queryShop: {
                "numPerPage": 10,
                "currentPage": 1
            }
        },
        requestType: [
            "queryShop/shop"
        ],


        //自定义方法


        //自定义事件

    })

});