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
                "industryMap": {
                    "1": "化工  塑料  涂料  表面",
                    "2": "安防  消防",
                    "5": "五金  建材  家装  钢铁",
                    "6": "服装  纺织",
                    "7": "印刷  包装  丝印"
                },
                "entryMap": {
                    "4": "真石漆",
                    "208": "帐篷",
                    "483": "花洒",
                    "624": "激光裁剪机",
                    "744": "打印机"
                },
                "dictMap": {
                    "3": "塑料橡胶",
                    "14": "抢险救援",
                    "33": "五金配件",
                    "40": "加工设备",
                    "48": "印花机械"
                }
            },
            "memberList":
            [
                {
                    "memberId": 1,
                    "memberName": "GXG有限公司",
                    "product": "设计各类服装风格、制作各式衣服、裤子",
                    "reputation": 1900,
                    "logoPath": "test_logo1.jpg",
                    "frontPicPath": "test_qiye_1.jpg",
                    "guarantee": 1,
                    "highQuality": 1,
                    "sincerity": 1,
                    "returnGoods": 1,
                    "province": "1",
                    "city": "2",
                    "area": "3",
                    "address": "test",
                    "popularize": 1,
                    "enterTime": null,
                    "industryList": [
                        {
                            "id": 5,
                            "industry": 7,
                            "industryName": "印刷  包装  丝印"
                        },
                        {
                            "id": 4,
                            "industry": 6,
                            "industryName": "服装  纺织"
                        }
                    ],
                    "dictList": [
                        {
                            "id": 5,
                            "categoryDict": 48,
                            "dictName": "印花机械"
                        },
                        {
                            "id": 4,
                            "categoryDict": 40,
                            "dictName": "加工设备"
                        }
                    ],
                    "entryList": [
                        {
                            "id": 5,
                            "categoryEntry": 744,
                            "entryName": "打印机"
                        },
                        {
                            "id": 4,
                            "categoryEntry": 624,
                            "entryName": "激光裁剪机"
                        }
                    ],
                },

                {
                    "memberId": 2,
                    "memberName": "伊利莎白雅顿公司",
                    "product": "经营销售各类护肤保养品、彩妆、香水",
                    "reputation": 1000,
                    "logoPath": "",
                    "frontPicPath": "test_qiye_2.jpg",
                    "guarantee": 1,
                    "highQuality": 1,
                    "sincerity": 1,
                    "returnGoods": 1,
                    "province": "1",
                    "city": "2",
                    "area": "3",
                    "address": "test",
                    "popularize": 1,
                    "enterTime": null,
                    "industryList": [
                        {
                            "id": 2,
                            "industry": 5,
                            "industryName": "五金  建材  家装  钢铁"
                        },
                        {
                            "id": 3,
                            "industry": 2,
                            "industryName": "安防  消防"
                        },
                        {
                            "id": 1,
                            "industry": 1,
                            "industryName": "化工  塑料  涂料  表面"
                        }
                    ],
                    "dictList": [
                        {
                            "id": 2,
                            "categoryDict": 33,
                            "dictName": "五金配件"
                        },
                        {
                            "id": 3,
                            "categoryDict": 14,
                            "dictName": "抢险救援"
                        },
                        {
                            "id": 1,
                            "categoryDict": 3,
                            "dictName": "塑料橡胶"
                        }
                    ],
                    "entryList": [
                        {
                            "id": 2,
                            "categoryEntry": 483,
                            "entryName": "花洒"
                        },
                        {
                            "id": 3,
                            "categoryEntry": 208,
                            "entryName": "帐篷"
                        },
                        {
                            "id": 1,
                            "categoryEntry": 4,
                            "entryName": "真石漆"
                        }
                    ],
                },
            ],
            "pagination":
                {
                    "numPerPage": 20,
                    "currentPage": 104,
                    "startRow": 0,
                    "endRow": 20,
                    "totalPages": 110,
                    "totalRows": 50
                }
        }
    }

})
