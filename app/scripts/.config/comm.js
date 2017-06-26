/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.path"
], function ($, _, can, path) {

    /**
     * @description 创建Comm通讯基类
     */
    return can.Model.extend({

        /**
         * @description 为Comm对象绑定参数
         */
        setData: function(param){
            var tempUrl =  path.urlHost + param.urlPath;
            this.url =     param.urlPath!=null?  tempUrl:       (this.url!=null?     this.url:    "");
            this.type =    param.type!=null?     param.type:    (this.type!=null?    this.type:   "post");
            this.data =    param.data!=null?     param.data:    (this.data!=null?    this.data:    {});
            this.fixture = param.fixture!=null?  param.fixture: (this.fixture!=null? this.fixture: false);
        },

        /**
         * @description 发送请求,获得返回数据
         * @return {can.Deferred}
         */
        request: function() {
            var def = can.Deferred();
            var that = this;
            can.ajax({
                url: that.url,
                type: that.type,
                data: that.data,
                fixture: that.fixture
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
            //step2 发送请求,返回数据
            return this.request();
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