/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define(["jquery", "underscore", "can", "fixture.data"], function($, _, can, fixtureData) {

    //模拟REST
    can.fixture({
        'GET /card/findCity': function () {
            var data = {};
            $.extend(true, data, fixtureData.getHederTop);
            return data;
        },
        'GET /card/findNav': function () {
            var data = {};
            $.extend(true, data, fixtureData.getHederNav);
            return data;
        }
    });

})