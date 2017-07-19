/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(["config.comm"], function(Comm){

    /** @queryAll:  page-shop-1数据
     */
    return Comm.extend({

        queryAll: function(data, fixture){
            if(!data || !data.memberId){
                return  can.Deferred().reject();
            }
            return this.sendRequest({
                "apiPath":  "/"+data.memberId+"/commoditys",
                "type":     "get",
                "data":      data||null,
                "fixture":   fixture
            })
        }

    },{});

});