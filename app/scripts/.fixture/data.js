/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "fixture.data.index.1",
    "fixture.data.nav.1",
    "fixture.data.searchCompany.1",
    "fixture.data.searchShop.1",
    "fixture.data.company.1",
    "fixture.data.shop.1"
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

});
