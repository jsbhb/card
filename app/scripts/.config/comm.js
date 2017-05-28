/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can"
], function ($, _, can) {

    /**
     * @description 创建Comm通讯基类
     */
    return can.Model.extend({

        /**
         * @description 为Comm对象绑定参数
         */
        setData: function(param){
            this.url = param.url   || this.url  || "";
            this.type = param.type || this.type || "post";
            this.data = param.data || this.data || null;
            this.fixtrue = true;
        },

        /**
         * @description 构建向服务端发起请求的数据
         */
        buildRequestData: function(){
            // 构建请求的数据
            var requestData = {};
            // 扩展传入的参数
            this.data && $.extend(true, requestData, this.data);
            // 返回构建的数据
            return requestData;
        },

        /**
         * @description 发送请求,获得返回数据
         * @return {can.Deferred}
         */
        request: function(data) {
            var def = can.Deferred();
            var that = this;
            can.ajax({
                url: that.url,
                type: that.type,
                data: data,
                fixture: that.fixtrue
            }).done(function(response) {
                def.resolve(new can.Model(response));
            }).fail(function(error) {
                def.reject(error);
            });
            return def;
        },

        /**
         * @description 构建请求
         * @return {Object} can.Deferred
         */
        sendRequest: function(param) {
            //step1 设置参数
            this.setData(param);
            //step2 构建向服务端发起请求的数据
            var requestData = this.buildRequestData();
            //step2 发送请求,获得返回数据
            return this.request(requestData);
        },

        /**
         * @description 初始化
         */
        init: function(param) {
            //设置参数
            this.setData(param);
        }

    })

});