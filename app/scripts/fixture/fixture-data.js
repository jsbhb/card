/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define([
    "fixture.data.region",
    "fixture.data.nav"
], function(region, nav){

    //模拟数据库
    return {
        getRegion: region,
        getNav: nav
    }

})
