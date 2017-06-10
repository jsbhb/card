/**
 * Created by linpengteng on ,2021/5/17.
 */

'use strict';

define(function(){

    return {
        "success": true,
        "msg": null,
        "obj":
        {
            "searchFilter":
            {
                "industryMap":
                {
                    "1": "服装行业",
                    "2": "美妆香水",
                },
                "categoryMap":
                {
                    "5": "衣服",
                    "6": "香水",
                    "7": "轻奢品",
                }
            },
            "memberList":
            [

                {
                    "memberId": 1,
                    "memberName": "GXG有限公司",
                    "memberClassify":
                        [
                            {
                                "id": 2,
                                "industry": "2",
                                "industryName": "test2",
                                "category": "6",
                                "categoryName": "test6"
                            },
                            {
                                "id": 3,
                                "industry": "3",
                                "industryName": "test3",
                                "category": "7",
                                "categoryName": "test7"
                            },
                            {
                                "id": 1,
                                "industry": "1",
                                "industryName": "test1",
                                "category": "5",
                                "categoryName": "test5"
                            },
                            {
                                "id": 4,
                                "industry": "4",
                                "industryName": "test4",
                                "category": "8",
                                "categoryName": "test8"
                            },


                            {
                                "memberId": 2,
                                "memberName": "GXG有限公司",
                                "memberClassify":
                                    [ ],
                                "product": "设计各类服装风格、制作各式衣服、裤子",
                                "reputation": 1000,
                                "logoPath": "",
                                "frontPicPath": "/app/images/test/test_qiye_1.jpg",
                                "guarantee": 1,
                                "highQuality": 1,
                                "sincerity": 1,
                                "returnGoods": 1,
                                "province": "1",
                                "city": "2",
                                "area": "3",
                                "address": "test",
                                "popularize": 1,
                                "enterTime": null
                            },
                        ],
                    "product": "设计各类服装风格、制作各式衣服、裤子",
                    "reputation": 1900,
                    "logoPath": "/app/images/test/test_logo1.jpg",
                    "frontPicPath": "/app/images/test/test_qiye_1.jpg",
                    "guarantee": 1,
                    "highQuality": 1,
                    "sincerity": 1,
                    "returnGoods": 1,
                    "province": "1",
                    "city": "2",
                    "area": "3",
                    "address": "test",
                    "popularize": 1,
                    "enterTime": null
                },

                {
                    "memberId": 2,
                    "memberName": "伊利莎白雅顿公司",
                    "memberClassify":
                        [ ],
                    "product": "经营销售各类护肤保养品、彩妆、香水",
                    "reputation": 1000,
                    "logoPath": "",
                    "frontPicPath": "/app/images/test/test_qiye_2.jpg",
                    "guarantee": 1,
                    "highQuality": 1,
                    "sincerity": 1,
                    "returnGoods": 1,
                    "province": "1",
                    "city": "2",
                    "area": "3",
                    "address": "test",
                    "popularize": 1,
                    "enterTime": null
                },
            ],
            "pagination":
                {
                    "numPerPage": 20,
                    "currentPage": 1,
                    "startRow": 0,
                    "endRow": 20,
                    "totalPages": 1,
                    "totalRows": 2
                }
        }
    }

})
