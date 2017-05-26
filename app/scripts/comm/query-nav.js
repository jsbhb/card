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

    /** @queryNav:  查询Nav数据
     */
    return new Comm({
        all: function(){
            return this.sendRequest({
                url: "/card/nav/queryAll",
                type: "get"
            })
        }
    });

});