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

    options['GET '+path.urlHost+'/popularizations/index'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataIndex1);
        console.log("--- comm_index: requestData ---");
        console.log(requestData);
        console.log("--- comm_index: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+path.urlHost+'/commons/memberCategory'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataNav1);
        console.log("--- comm_nav: requestData  ---");
        console.log(requestData);
        console.log("--- comm_nav: responseData  ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+path.urlHost+'/members'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataSearchCompany1);
        console.log("--- comm_searchCompany: requestData ---");
        console.log(requestData);
        console.log("--- comm_searchCompany: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+path.urlHost+'/members/{id}'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataCompany1);
        console.log("--- comm_company: requestData ---");
        console.log(requestData);
        console.log("--- comm_company: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+path.urlHost+'/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataSearchShop1);
        console.log("--- comm_searchShop: requestData ---");
        console.log(requestData);
        console.log("--- comm_searchShop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    options['GET '+path.urlHost+'/{memberId}/commoditys'] = function(requestData){
        var responseData = {};
        $.extend(true, responseData, fixtureData.getDataShop1);
        console.log("--- comm_shop: requestData ---");
        console.log(requestData);
        console.log("--- comm_shop: responseData ---");
        console.log(responseData);
        console.log("\n");
        return responseData;
    };

    can.fixture(options);

});