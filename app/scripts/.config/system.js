/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define(function(){

    return {

        /** @description
         *
         *     apiUrl:      API接口的部分路径
         *                    --- http://120.27.225.133:8080/cardapi/1.0
         *
         *     fixture:    是否启用本地测试
         *                    --- 取消本地测试时, 请注释掉 "render.js" 文件中 "fixture.test"
         *                    --- 启用本地测试时, 请在 "render.js" 文件中 引用"fixture.test"
         *
         *     logOutput:  是否输出页面加载渲染相关信息
         *
         */
        apiUrl:     "http://120.27.225.133:8080/cardapi/1.0",
        fixture:    false,
        logOutput:  false

    }

});