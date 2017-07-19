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
         * @description: 用于子类扩展
         *
         *    @template:     模板文件 ------- mustache内容
         *    @config:       默认配置 ------ { 配置数据 }
         *    @region:       区域设置 ------ { 区域名称: { 数据节点, 是否动态, 相关事件 } }
         *    @requestData:  请求参数 ------ { 请求类型: { 请求参数 } }
         *    @requestType:  请求类型组 ---- [ "请求类型/区域名称/数据节点" ]
         *
         */
        template:      "",
        config:        {},
        region:        {},
        requestData:   {},
        requestType:   [],



        /**
         * @description  模板渲染过程（可异步处理多个请求或多个response数据）
         *     --> 1.标识模板状态为处理中
         *     --> 2.异步发送请求, 等待反馈信息
         *     --> 3.获取反馈信息, 成功则构建渲染数据
         *     --> 4.待处理完所有请求, 则执行渲染前事件
         *     --> 5.生成模板进行渲染, 并将其添加至DOM元素内
         *     --> 6.执行渲染后事件, 并更新模板为完成状态
         */
        toRender: function(render){
            var that = this;
            var deferred = [];
            var regionArr = [];
            var elementId = this.element.attr("id");
            var tempArr = [].concat(render);
            var renderArr = tempArr.length>0? tempArr: [undefined];
            this.state = $.Deferred();
            common.logOutput(elementId, "执行渲染过程");
            $.each(renderArr, function(index, map){
                if(map==="function") return true;
                var notExist = typeof map === "undefined";
                var isObject = typeof map === "object";
                var isString = typeof map === "string";
                var tempArr = isString? map.split("/"): [];
                var send = (isObject||notExist)? undefined: isString? tempArr.shift(): "";
                deferred[index] = that.sendRequest(send)
                    .done(function(response){
                        var isSuccess = response && response.success;
                        var dataObj = isSuccess? response.obj: {};
                        var data = isObject? map.data: dataObj;
                        var name = isObject? map.region: tempArr || "RESPONSE";
                        regionArr[index] = [].concat(name)[0] || "RESPONSE";
                        that.setRenderData(data, name);
                        common.logOutput(elementId, "已构建渲染数据");
                    })
            });
            $.when.apply(null, deferred)
                .always(function() {
                    common.logOutput(elementId, "执行渲染前事件");
                    $.each(regionArr, function(index, name){
                        $.when(deferred[index]).done(function(){
                            var region = that.options.region;
                            typeof region[name] === "object" &&
                            typeof region[name].beforeFunc === "function" &&
                            region[name].beforeFunc(that);
                        });
                    });
                    common.logOutput(elementId, "渲染模板至DOM元素内");
                    that.render();
                    common.logOutput(elementId, "执行渲染后事件");
                    $.each(regionArr, function(index, name){
                        $.when(deferred[index]).done(function(){
                            var region = that.options.region;
                            typeof region[name] === "object" &&
                            typeof region[name].afterFunc === "function" &&
                            region[name].afterFunc(that);
                        })
                    });
                    that.state.resolve();
                });
        },



        /**
         * @description  发送请求, 等待返回响应数据
         */
        sendRequest: function(type){
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
        setRenderData: function(data, name){
            if(typeof data !== "object") return;
            var that = this;
            var node = that.options.renderData;
            var nameArr = common.isArray(name)? name: name? name.split("/"): ["RESPONSE"];
            var region = that.options.region[nameArr.shift()];
            var regionPath = region && region.path && region.path.split("/") || ["RESPONSE"];
            var regionDynamic = region? region.dynamic: false;
            var pathArr = regionPath.concat(nameArr);
            $.each(pathArr, function(index){
                if(index === 0){
                    node["CONFIG"] = new can.Map(that.options.config);
                }
                if(pathArr.length > 1){
                    var name = pathArr.shift();
                    if(pathArr[0] !== "RESPONSE" && pathArr[0] !== ""){
                        typeof node[name] !== "object"?
                            node = node[name] = {}: node = node[name];
                    }
                }
                if(pathArr.length === 1){
                    regionDynamic?
                        common.isArray(data)?
                            node[pathArr[0]] = new can.Map.List(data):
                            node[pathArr[0]] = new can.Map(data):
                        node[pathArr[0]] = data;
                }
            });
        },



        /**
         * @description  生成模板进行渲染, 并将其添加至DOM元素内
         */
        render: function(){
            if(this.options.template){
                this.element.html(
                    can.mustache(this.options.template)(this.options.renderData)
                );
            }
        },



        /**
         * @description
         *    this.options.template:      参数 -- 模板文件
         *    this.options.config:        参数 -- 默认配置
         *    this.options.region:        参数 -- 区域设置
         *    this.options.requestData:   参数 -- 请求参数
         *    this.options.requestType:   参数 -- 请求类型
         *    this.options.renderData:    参数 -- 渲染数据
         *    this.toRender:              方法 -- 渲染过程
         */
        init: function(){
            this.options.template = this.options.template || this.template;
            this.options.config = $.extend(true, {}, this.config, this.options.config);
            this.options.region = $.extend(true, {}, this.region, this.options.region);
            this.options.requestData = $.extend(true, {}, this.requestData, this.options.requestData);
            this.options.requestType = this.options.requestType || this.requestType;
            this.options.renderData =  { CONFIG:{}, RESPONSE:{} };
            this.toRender(this.options.response || this.options.requestType);
        }
    })

});