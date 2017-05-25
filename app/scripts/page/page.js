/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(["jquery", "underscore"], function($, _){

    var pageHeaderTop = "<div class='load-page-header-top'></div>";
    var pageHeaderCenter = "<div class='load-page-header-center'></div>";
    var pageBodyNav = "<div class='load-page-body-nav'></div>";

    $("body").append(pageHeaderTop);
    $("body").append(pageHeaderCenter);
    $("body").append(pageBodyNav);

    // 根据元素节点，加载模块
    require(["page.header.top"]);
    require(["page.header.center"]);
    require(["page.body.nav"]);

})