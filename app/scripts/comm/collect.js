/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "comm.collect.index",
    "comm.collect.nav",
    "comm.collect.searchCompany",
    "comm.collect.searchShop",
    "comm.collect.company",
    "comm.collect.shop",
], function(
    $, _,
    comm_index,
    comm_nav,
    comm_searchCompany,
    comm_searchShop,
    comm_company,
    comm_shop
){

    /** @description:  所有通讯交互的中转站
     */
    return {

        "queryIndex": function(requestData){
            return comm_index.queryAll(requestData, null)
        },

        "queryNav": function(requestData){
            return comm_nav.queryAll(requestData, null)
        },

        "querySearchCompany": function(requestData){
            return comm_searchCompany.queryAll(requestData, null)
        },

        "querySearchShop": function(requestData){
            return comm_searchShop.queryAll(requestData, null)
        },

        "queryCompany": function(requestData){
            return comm_company.queryAll(requestData, null)
        },

        "queryShop": function(requestData){
            return comm_shop.queryAll(requestData, null)
        }

    }

});