/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define(["jquery", "underscore", "can", "fixture.data"], function($, _, can, fixtureData) {

    //模拟REST
    can.fixture({
        'GET /card/findLocalCity': function () {
            var data = {};
            $.extend(true, data, fixtureData);
            return data;
        }
    });

})