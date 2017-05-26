/**
 * Created by linpengteng on 2017/5/17.
 */

'use strict';

define(function(){

    //模拟数据库(全局)
    return {

        getRegion: {
            //区域
            region: {
                localCity: "宁波",
                province: {},
                city: {},
                area:{}
            }
        },

        getNavigation: {
            //导航模块
            navigation: {
                items:[
                    {
                        title: "食品饮料",
                        content: {
                            "休闲食品": "#休闲食品",
                            "牛奶": "#牛奶",
                            "饮料": "#饮料",
                            "坚果": "#坚果"
                        }
                    }
                ],
                more: [
                    [
                        {
                            title: "进口食品",
                            content: {
                                "休闲零食": "#休闲零食",
                                "饼干蛋糕": "#饼干蛋糕",
                                "橄榄油": "#饮料",
                                "坚果蜜饯": "#坚果蜜饯",
                                "糖果/巧克力": "#糖果-巧克力",
                                "进口牛奶": "#进口牛奶",
                                "方便食品": "#方便食品",
                                "饮料冲调": "#饮料冲调"
                            }
                        },
                        {
                            title: "休闲食品",
                            content: {
                                "饼干蛋糕": "#饼干蛋糕",
                                "猪肉脯": "#猪肉脯",
                                "薯片/膨化": "#薯片-膨化",
                                "鸭脖": "#鸭脖",
                                "海苔": "#海苔",
                                "牛肉干": "#牛肉干",
                                "果蔬干": "#果蔬干",
                                "果冻": "#果冻",
                                "辣条": "#辣条"
                            }
                        }
                    ]
                ],
                imgs:{
                    items:[
                        [
                            { "/app/images/test_9.jpg": "#img9" },
                            { "/app/images/test_10.jpg": "#img10" },
                            { "/app/images/test_11.jpg": "#img11" }
                        ]
                    ],
                    banner: [
                        { "/app/images/test_1.jpg": "#img1" },
                        { "/app/images/test_2.jpg": "#img2" },
                        { "/app/images/test_3.jpg": "#img3" },
                        { "/app/images/test_4.jpg": "#img4" },
                        { "/app/images/test_5.jpg": "#img5" },
                        { "/app/images/test_6.jpg": "#img6" }
                    ],
                    banner_bottom:[
                        { "/app/images/test_7.jpg": "#img7" },
                        { "/app/images/test_8.jpg": "#img8" },
                        { "/app/images/test_7.jpg": "#img7" },
                        { "/app/images/test_8.jpg": "#img8" },
                    ]
                }
            }
        }
    }
})
