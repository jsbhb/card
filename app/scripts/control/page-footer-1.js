/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.footer.1"
], function($, can, common, Render){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return Render.extend({
        //子类扩展
        templates: "<page-footer-1></page-footer-1>",
        isDynamic: "NO"
    })

});