/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(["jquery", "underscore"], function($, _){

    // 创建元素节点
    var pageHeaderTop = "<div class='load-page-header-top'></div>";
    var pageHeaderCenter = "<div class='load-page-header-center'></div>";
    $(".load-page-header").append(pageHeaderTop + pageHeaderCenter);

    // 根据元素节点，加载模块
    require(["page.header.top"]);
    require(["page.header.center"]);

})