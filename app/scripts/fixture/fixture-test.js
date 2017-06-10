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
        'GET http://192.168.2.224:8080/cardapi/1.0/popularizations/index': function () {
            var data = {};
            $.extend(true, data, fixtureData.getDataIndex1);
            return data;
        },
        'GET http://192.168.2.224:8080/cardapi/1.0/members': function () {
            var data = {};
            $.extend(true, data, fixtureData.getDataSearchCompany1);
            return data;
        },
        'GET http://192.168.2.224:8080/cardapi/1.0/commodityName': function () {
            var data = {};
            $.extend(true, data, fixtureData.getDataSearchShop1);
            return data;
        },
        'GET /card/getCompany/queryAll': function () {
            var data = {};
            $.extend(true, data, null);
            return data;
        },
        'GET /card/getShop/queryAll': function () {
            var data = {};
            $.extend(true, data, null);
            return data;
        }

    });

})