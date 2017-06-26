/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.path",
    "bower.fixture",
    "fixture.data"
], function($, _, can, path, fixture, fixtureData) {

    var options = {};

    options['GET '+path.urlHost+'/1.0/commons/memberCategory'] = function(){
        var data = {};
        $.extend(true, data, fixtureData.getDataNav1);
        return data;
    };
    options['GET '+path.urlHost+'/cardapi/1.0/popularizations/index'] = function(){
        var data = {};
        $.extend(true, data, fixtureData.getDataIndex1);
        return data;
    };
    options['GET '+path.urlHost+'/cardapi/1.0/members'] = function(){
        var data = {};
        $.extend(true, data, fixtureData.getDataSearchCompany1);
        return data;
    };
    options['GET '+path.urlHost+'/cardapi/1.0/members/{id}'] = function(a){
        var data = {};
        $.extend(true, data, fixtureData.getDataCompany1);
        return data;
    };
    options['GET '+path.urlHost+'/cardapi/1.0/commoditys'] = function(){
        var data = {};
        $.extend(true, data, fixtureData.getDataSearchShop1);
        return data;
    };
    options['GET '+path.urlHost+'/cardapi/1.0/{memberId}/commoditys'] = function(a){
        var data = {};
        $.extend(true, data, fixtureData.getDataShop1);
        return data;
    };

    can.fixture(options);

});