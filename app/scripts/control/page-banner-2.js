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
    "component.page.banner.2",
    "bower.css!css.page.banner.2",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-banner-2></page-banner-2>"
    })

});