/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define(["can"], function(can){

    //模拟数据库(全局)
    return can.Map.extend({

        getHederTop: {
            //区域
            region: {
                localCity: "宁波",
                province: {},
                city: {},
                area:{}
            }

        },

        getHederNav: {
            //导航模块
            navData: {
            }
        }


    },{})

})