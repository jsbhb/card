/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "bower.fixture",
    "config.system",
    "test.data"
], function($, _, can, fixture, system, testData) {

    var options = {};

    options['GET '+system.urlHost+'/popularizations/index'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getIndex1);
        console.log("--- comm/index: requestData ---");
        console.log(requestData);
        console.log("--- comm/index: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.urlHost+'/commons/memberCategory'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getNav1);
        console.log("--- comm/nav: requestData  ---");
        console.log(requestData);
        console.log("--- comm/nav: responseData  ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.urlHost+'/members'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getSearchCompany1);
        console.log("--- comm/searchCompany: requestData ---");
        console.log(requestData);
        console.log("--- comm/searchCompany: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.urlHost+'/members/{id}'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getCompany1);
        console.log("--- comm/company: requestData ---");
        console.log(requestData);
        console.log("--- comm/company: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.urlHost+'/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getSearchShop1);
        console.log("--- comm/searchShop: requestData ---");
        console.log(requestData);
        console.log("--- comm/searchShop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+system.urlHost+'/{memberId}/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, testData.getShop1);
        console.log("--- comm/shop: requestData ---");
        console.log(requestData);
        console.log("--- comm/shop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    can.fixture(options);

});