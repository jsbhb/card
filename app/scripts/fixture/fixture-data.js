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
    "fixture.data.shop.1",
], function(
    dataIndex1,
    dataNav1,
    dataSearchCompany1,
    dataSearchShop1,
    dataCompany1,
    dataShop1){

    return {
        getDataIndex1:              dataIndex1,
        getDataNav1:                dataNav1,
        getDataSearchCompany1:      dataSearchCompany1,
        getDataSearchShop1:         dataSearchShop1,
        getDataCompany1:            dataCompany1,
        getDataShop1:               dataShop1
    }

})
