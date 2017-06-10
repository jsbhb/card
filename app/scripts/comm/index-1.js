/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.comm",
    "fixture.test"
], function($, _, can, Comm){

    /** @queryAll:  page-index-1数据
     */
    return new Comm({
        queryAll: function(){
            return this.sendRequest({
                url: "http://192.168.2.224:8080/cardapi/1.0/popularizations/index",
                type: "get",
                fixtrue: true
            })
        }
    });

});