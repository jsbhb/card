/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "config.comm",
    "fixture.test"
], function($, _, can, Comm){

    /** @city:  查询所在市区
     */
    return new Comm({
        all: function(){
            return this.sendRequest({
                url: "/card/city/queryAll",
                type: "get"
            })
        }
    });

});