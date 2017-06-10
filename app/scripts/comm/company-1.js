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

    /** @queryAll:  page-searchCompany-1数据
     */
    return new Comm({
        queryAll: function(data){
            return this.sendRequest({
                url: "/card/getCompany/queryAll",
                type: "get",
                data: data
            })
        }
    });

});