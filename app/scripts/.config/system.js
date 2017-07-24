/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(function(){

    return {

        /** @description  数据接口相关配置
         *
         *      apiUrl:   API接口的部分路径
         *                  --- http://120.27.225.133:8080/cardapi/1.0
         *
         *      fixture:   是否启用本地测试
         *                   --- 取消本地测试时, 请注释掉 "render.js" 文件中 "fixture.test"
         *                   --- 启用本地测试时, 请在 "render.js" 文件中 引用"fixture.test"
         *
         *      logOutput:  是否输出页面加载渲染相关信息
         *
         */
        apiUrl:     "http://120.27.225.133:8080/cardapi/1.0",
        fixture:    false,
        logOutput:  false,



        /** @description   图片储存目录
         *
         *      root:      图片储存根目录
         *      user:      用户图片目录
         *      platform:  平台图片目录
         *      member:    企业图片目录
         *      shop:      商品图片目录
         *      test:      测试专用目录
         *
         */
        imgCatalog: {
            root:      "/app/images/",
            user:      "/app/images/users/",
            platform:  "/app/images/platform/",
            member:    "/app/images/members/memberId/",
            shop:      "/app/images/members/memberId/products/commodityId/",
            test:      "/app/images/test/"
        }

    }

});