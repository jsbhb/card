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
    "component.page.footer.1",
    "bower.css!css.page.footer.1",
], function($, _, can, common, Render){

    /** @description:  调用数据、模板组件, 并渲染输出
     */
    return Render.extend({
        //子类扩展
        templatesPath: "<page-footer-1></page-footer-1>",
    })

});