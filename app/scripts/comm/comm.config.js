/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define(function () {

    var protocol = window.location.protocol;

    var COMM_CONFIG = {
        url: protocol + '//',
        fixtrue: true
    };

    return COMM_CONFIG;

});