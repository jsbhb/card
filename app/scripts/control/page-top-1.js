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
    "bower.css!css.page.top.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-top-1></page-top-1>",
        config: {},
        region: {},
        requestData: {},
        requestType: []


        //自定义方法


        //自定义事件

    })

});