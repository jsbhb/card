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
        'GET /card/getIndex1/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getDataIndex1);
            return data;
        }
    });

    can.fixture({
        'GET /card/getSearch1/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getDataSearch1);
            return data;
        }
    });

})