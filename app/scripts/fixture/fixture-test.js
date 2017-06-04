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
        'GET /card/pageIndex1/queryAll': function () {
            var data = {};
            $.extend(true, data, fixtureData.getPageIndex1);
            return data;
        }
    });

})