/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "fixture.data.region",
    "fixture.data.nav",
    "fixture.data.infoA"
], function(region, nav, infoA){

    //模拟数据库
    return {
        getRegion: region,
        getNav: nav,
        getInfoA: infoA
    }

})
