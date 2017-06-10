/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "fixture.data.index.1",
    "fixture.data.searchCompany.1",
    "fixture.data.searchShop.1"
], function(dataIndex1, dataSearchCompany1, dataSearchShop1){

    return {
        getDataIndex1:         dataIndex1,
        getDataSearchCompany1: dataSearchCompany1,
        getDataSearchShop1:    dataSearchShop1
    }

})
