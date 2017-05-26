/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "comm.config",
    "fixture.test"
], function($, _, can, Comm){

    /** @queryNav:  查询Nav数据
     */
    return new Comm({
        queryAll: function(){
            return this.sendRequest({
                url: "/card/nav/queryAll",
                type: "get"
            })
        }
    });

});