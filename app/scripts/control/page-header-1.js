/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.header.1",
    "bower.css!css.page.header.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-header-1></page-header-1>",
        config: {},
        region: {},
        requestData: {},
        requestType: []


        //自定义方法


        //自定义事件

    })

});