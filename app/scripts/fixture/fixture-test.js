/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "fixture.data"
], function($, _, can, fixtureData) {

    //模拟REST
    can.fixture({
        'GET /card/city/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getRegion);
            return data;
        },
        'GET /card/nav/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getNavigation);
            return data;
        }
    });

})