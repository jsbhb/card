/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "bower.fixture",
    "fixture.data"
], function($, _, can, fixture, fixtureData) {

    //模拟REST
    can.fixture({
        'GET /card/city/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getRegion);
            return data;
        },
        'GET /card/nav/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getNav);
            return data;
        },
        'GET /card/infoA/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getInfoA);
            return data;
        }
    });

})