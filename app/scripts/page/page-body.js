/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(["jquery", "underscore"], function($, _){

    // 创建元素节点
    var pageBodyNav = "<div class='load-page-body-nav'></div>";
    $(".load-page-header").append(pageBodyNav);

    // 根据元素节点，加载模块
    require(["page.body.nav"]);

})