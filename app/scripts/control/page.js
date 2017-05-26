/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "control.page.header.top",
    "control.page.header.center",
    "control.page.body.nav"
], function($, _, pageHeaderTop, pageHeaderCenter, pageBodyNav){

    var el_headerTop=    "<div class='load-page-header-top'></div>";
    var el_headerCenter= "<div class='load-page-header-center'></div>";
    var el_bodyNav=      "<div class='load-page-body-nav'></div>";

    $("body")
        .append(el_headerTop)
        .append(el_headerCenter)
        .append(el_bodyNav);

    new pageHeaderTop(".load-page-header-top");
    new pageHeaderCenter(".load-page-header-center");
    new pageBodyNav(".load-page-body-nav");

})