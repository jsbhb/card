/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "test.data.index.1",
    "test.data.nav.1",
    "test.data.searchCompany.1",
    "test.data.searchShop.1",
    "test.data.company.1",
    "test.data.shop.1"
], function(
    dataIndex1,
    dataNav1,
    dataSearchCompany1,
    dataSearchShop1,
    dataCompany1,
    dataShop1){

    return {
        getIndex1:              dataIndex1,
        getNav1:                dataNav1,
        getSearchCompany1:      dataSearchCompany1,
        getSearchShop1:         dataSearchShop1,
        getCompany1:            dataCompany1,
        getShop1:               dataShop1
    }

})
