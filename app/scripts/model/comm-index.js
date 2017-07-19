/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(["config.comm"], function(Comm){

    /** @queryAll:  page-index-1数据
     */
    return Comm.extend({

        queryAll: function(data, fixture){
            return this.sendRequest({
                "apiPath":  "/popularizations/index",
                "type":     "get",
                "data":      data||null,
                "fixture":   fixture
            })
        }

    },{});

});