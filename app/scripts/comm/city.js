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

    /** @queryAll:  查询市区
     */
    return new Comm({
        queryAll: function(){
            return this.sendRequest({
                url: "/card/city/queryAll",
                type: "get"
            })
        }
    });

});