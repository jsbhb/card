/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.fixture",
    "config.system",
    "fixture.data"
], function($, can, fixture, system, fixtureData) {

    var options = {};

    options['GET '+system.apiUrl+'/popularizations/index'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getIndex1);
        console.log("--- comm/index: requestData ---");
        console.log(requestData);
        console.log("--- comm/index: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.apiUrl+'/commons/memberCategory'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getNav1);
        console.log("--- comm/nav: requestData  ---");
        console.log(requestData);
        console.log("--- comm/nav: responseData  ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.apiUrl+'/members'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getSearchCompany1);
        console.log("--- comm/searchCompany: requestData ---");
        console.log(requestData);
        console.log("--- comm/searchCompany: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.apiUrl+'/members/{id}'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getCompany1);
        console.log("--- comm/company: requestData ---");
        console.log(requestData);
        console.log("--- comm/company: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.apiUrl+'/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getSearchShop1);
        console.log("--- comm/searchShop: requestData ---");
        console.log(requestData);
        console.log("--- comm/searchShop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.apiUrl+'/{memberId}/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getShop1);
        console.log("--- comm/shop: requestData ---");
        console.log(requestData);
        console.log("--- comm/shop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    can.fixture(options);

});