/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "control.page.header.top",
    "control.page.header.center",
    "control.page.body.nav",
    "control.page.body.infoA",
    "control.page.body.infoB"
], function($, _, pageHeaderTop, pageHeaderCenter, pageBodyNav, pageBodyInfoA, pageBodyInfoB){

    var el_headerTop=    "<div class='load-header-top'></div>";
    var el_headerCenter= "<div class='load-header-center'></div>";
    var el_bodyNav=      "<div class='load-body-nav' style='min-height:535px;'></div>";
    var el_bodyInfoA =  "<div class='load-body-infoA'></div>";
    var el_bodyInfoB =  "<div class='load-body-infoB'></div>";

    $("body")
        .append(el_headerTop)
        .append(el_headerCenter)
        .append(el_bodyNav)
        .append(el_bodyInfoA)
        .append(el_bodyInfoB);

    new pageHeaderTop(".load-header-top");
    new pageHeaderCenter(".load-header-center");
    new pageBodyNav(".load-body-nav");
    new pageBodyInfoA(".load-body-infoA");
    new pageBodyInfoB(".load-body-infoB");

})