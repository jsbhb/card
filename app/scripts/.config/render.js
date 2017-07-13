/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.system",
    "model.comm"
], function($, can, common, system, comm){

    /**
     * @description:  创建render基类
     */
    return can.Control.extend({

        /**
         * @config:            模板参数（用于子类扩展）
         * @templates:         模板路径（用于子类扩展）
         * @isDynamic:         是否动态渲染（用于子类扩展）
         * @isFinish:          是否加载完成（用于子类扩展）
         * @requestType:       向服务器发送的请求类别（用于子类扩展）
         * @requestData:       向服务器发送的请求参数（用于子类扩展）
         * @renderBeforeFunc:  渲染前事件（用于子类扩展）
         * @renderAfterFunc:   渲染后事件（用于子类扩展）
         */
        config:            {},
        templates:         "",
        isDynamic:         "YES",
        isFinish:          $.Deferred(),
        requestType:       undefined,
        requestData:       {},
        renderBeforeFunc:  function(){},
        renderAfterFunc:   function(){},


        /**
         * @description
         *     --> 1.向服务器发送请求    --> 2.获取数据, 执行渲染前事件
         *     --> 3.构建(刷新)渲染数据  --> 4.渲染模板, 添加至DOM元素内
         *     --> 5.执行渲染后事件
         */
        toRender: function(types){
            common.logOutput(this.options.eId, "执行渲染过程");
            var that = this;
            var deferreds = [];
            this.isFinish = $.Deferred();
            $.each([].concat(types), function(index, value){
                var notExist = typeof value === "undefined";
                var isObject = typeof value === "object";
                var isString = typeof value === "string" && value.trim()!=="";
                var pathArr = isString? value.split("/"): [];
                var sendType = (isObject||notExist)? undefined: isString? pathArr.shift(): "none";
                var pathStr = pathArr? pathArr.join("/"): undefined;
                deferreds[index] = that.sendRequest(sendType)
                    .done(function(responseData){
                        var isSuccess = responseData && responseData.success;
                        var dataObj = isSuccess? responseData.obj: null;
                        var data = isObject? value: dataObj;
                        common.logOutput(that.options.eId, "构建渲染数据: "+(sendType||"No need to query"));
                        that.setRenderData(data, pathStr);
                        common.logOutput(that.options.eId, "已构建渲染数据");
                    })
            });
            can.when.apply(null, deferreds)
                .always(function() {
                    common.logOutput(that.options.eId, "执行渲染前事件");
                    that.renderBeforeFunc();
                    common.logOutput(that.options.eId, "渲染模板至DOM元素内");
                    that.render();
                    common.logOutput(that.options.eId, "执行渲染后事件");
                    that.renderAfterFunc();
                    that.isFinish.resolve();
                });
        },


        /**
         * @description  发送请求, 等待返回响应数据
         */
        sendRequest: function(type){
            this.options.requestData = $.extend(
                true, {},
                this.requestData, this.options.requestData
            );
            if(type === undefined){
                return can.Deferred().resolve();
            }
            else if(typeof comm[type] === "function"){
                return comm[type](this.options.requestData[type]);
            }
            else{
                return can.Deferred().reject();
            }
        },


        /**
         * @description  构建(刷新)渲染数据
         */
        setRenderData: function(data, pathStr){
            var that = this;
            var cfg;
            var path = pathStr? pathStr.split("/"): ["RESPONSE"];
            var node;
            this.options.config = $.extend(
                true, {},
                this.config, this.options.config
            );
            if(path[0]!=="RESPONSE"){
                path = ["RESPONSE"].concat(path);
            }
            $.each(path, function(index){
                if(index === 0){
                    cfg = that.options.config;
                    node = that.options.renderData;
                    that.isDynamic.toUpperCase() === "YES"?
                        node.attr("CONFIG", cfg):
                        node["CONFIG"] = cfg;
                }
                if(path.length>1){
                    node=node[path.shift()];
                }
                if(path.length === 1){
                    that.isDynamic.toUpperCase() === "YES"?
                        node.attr(path[0], data):
                        node[path[0]] = data;
                }
            });
        },



        /**
         * @description  渲染模板至DOM元素内
         */
        render: function(){
            this.element.html(
                can.mustache(this.options.templates)(this.options.renderData)
            );
        },


        /**
         * @description
         *     this.options.eId:            参数 --> DOM元素ID
         *     this.options.config:         参数 --> 模板默认参数
         *     this.options.templates:      参数 --> templates路径
         *     this.options.requestType：   参数 --> 向服务器发送的请求类别
         *     this.options.requestData：   参数 --> 向服务器发送的请求参数
         *     this.options.responseData：  参数 --> response数据（若存在，则不再向服务器发送请求）
         *     this.options.renderData：    参数 --> 渲染模板的数据（通过 this.setRenderData()进行构建）
         */
        init: function(){
            this.options.eId = this.element.attr("id");
            this.options.config = $.extend(true, {}, this.config, this.options.config);
            this.options.templates = this.options.templates || this.templates;
            this.options.requestType = this.options.requestType || this.requestType;
            this.options.requestData = $.extend(true, {}, this.requestData, this.options.requestData);
            this.options.responseData = this.options.responseData || null;
            this.isDynamic.toUpperCase() === "YES"?
                this.options.renderData = new can.Map({ CONFIG:{}, RESPONSE:{} }):
                this.options.renderData = { CONFIG:{}, RESPONSE:{} };
            this.toRender(this.options.responseData||this.options.requestType);
        }
    })

});