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
                        "commodityBrand":
                            {
                                "1": "伊丽莎白雅顿",
                                "2": "GXG",
                            },
                        "commodityType":
                            {
                                "5": "香水",
                                "6": "美妆",
                                "7": "底妆",
                                "8": "夹克",
                                "9": "短袖",
                                "10": "休闲装",
                            }
                    },
                "commodityList":
                    [
                        {
                            "memberId": 1,
                            "memberName": "GXG服装有限公司",
                            "commodityId": 1,
                            "commodityName": "GXG男装 2017夏季新品时尚百搭韩版舒",
                            "price": "199.00",
                            "reputation": 12000,
                            "commoditySearchList": [ ],
                            "picture1": "/app/images/test/test_a1.jpg",
                            "picture2": "/app/images/test/test_a4.jpg",
                            "picture3": "/app/images/test/test_a5.jpg",
                            "picture4": "/app/images/test/test_a6.jpg",
                        },

                        {
                            "memberId": 2,
                            "memberName": "伊丽莎白雅顿化妆品公司",
                            "commodityId": 2,
                            "commodityName": "伊丽莎白雅顿5th第五大道女士香水30/75/125ml持久清新优雅淡香水",
                            "price": "619.00",
                            "reputation": 50000,
                            "commoditySearchList": [ ],
                            "picture1": "/app/images/test/test_b2.jpg",
                            "picture2": "/app/images/test/test_b3.jpg",
                            "picture3": "/app/images/test/test_b4.jpg",
                            "picture4": "/app/images/test/test_b5.jpg",
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
