/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define(["jquery", "underscore", "can", "fixture.data"], function($, _, can, fixtureData) {

    //模拟REST
    can.fixture({
        'GET /table/findAll': function (request, response) {
            var data = {};
            $.extend(true, data, fixtureData);
            fixtureData.info.pop();
            return [data];
        },
        'GET /table/findBody': function (request, response) {
            var data = {};
            $.extend(true, data, fixtureData);
            $.each(data, function(name, value){
                if(name!="info"){
                    delete data[name]
                }
            });
            return [data];
        },
        'GET /table/findBody/one': function (request, response) {

            //获取数据
            var data = {};
            $.extend(true, data, fixtureData);
            $.each(data, function(name, value){
                if(name!="info"){
                    delete data[name]
                }
            });
            $.each(data.info, function (name, map) {
                if (map.id == request.data.id) {
                    data.info =[];
                    data.info.push(map);
                    return false;
                }
            })

            //返回response
            response(200, "success", data);
        }
    });

})