/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.comm"
], function($, _, can, Comm){

    /** @queryAll:  page-company-1数据
     */
    return Comm.extend({

        queryAll: function(data, fixture){
            if(!data || !data.id){
                return
            }
            return this.sendRequest({
                "urlPath":  "/members/"+data.id,
                "type":     "get",
                "data":      data||null,
                "fixture":   fixture
            })
        }

    },{});

});