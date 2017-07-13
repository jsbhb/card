/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "config.system",
    "model.comm"
], function($, _, can, common, system, comm){

    /**
     * @description:  创建render基类
     */
    return can.Control.extend({

        /**
         * @config:            模板参数（用于子类扩展）
         * @templates:         模板路径（用于子类扩展）
         * @requestType:       向服务器发送的请求类别（用于子类扩展）
         * @requestData:       向服务器发送的请求参数（用于子类扩展）
         * @renderBeforeFunc:  渲染前事件（用于子类扩展）
         * @renderAfterFunc:   渲染后事件（用于子类扩展）
         * @renderAfterTime:   延时时间（用于子类扩展）
         */
        config:            {},
        templates:         "",
        requestType:       undefined,
        requestData:       {},
        renderBeforeFunc:  function(){},
        renderAfterFunc:   function(){},
        renderAfterTime:   0,


        /**
         * @description
         *     --> 1.向服务器发送请求    --> 2.获取数据, 执行渲染前事件
         *     --> 3.构建(刷新)渲染数据  --> 4.渲染模板, 添加至DOM元素内
         *     --> 5.异步执行渲染后事件
         */
        toRender: function(value){
            var that = this;
            var isObject = typeof value == "object";
            var isString = typeof value == "string";
            var type = isString? value: undefined;
            common.logOutput(this.elementId, "获取模块数据...");
            can.when(that.sendRequest(type))
                .done(
                    function(responseData){
                        var isSuccess = responseData && responseData.success;
                        var obj = isSuccess? responseData.obj: null;
                        var data = isObject? value: obj;
                        common.logOutput(that.elementId, "构建渲染数据");
                        that.setRenderData(data);
                        common.logOutput(that.elementId, "执行渲染前事件");
                        that.renderBeforeFunc(data);
                        common.logOutput(that.elementId, "渲染模板至DOM元素内");
                        that.render();
                        common.logOutput(that.elementId, "模板yi渲染完成");
                        if(that.renderAfterTime>10){
                            setTimeout(function(){
                                common.logOutput(that.elementId, "执行渲染后事件");
                                that.renderAfterFunc(data);
                                common.logOutput(that.elementId, "模块加载完成");
                                that.isFinish.resolve();
                            },that.renderAfterTime);
                        }else{
                            common.logOutput(that.elementId, "执行渲染后事件");
                            that.renderAfterFunc(data);
                            common.logOutput(that.elementId, "模块加载完成");
                            that.isFinish.resolve();
                        }
                    }
            );
        },


        /**
         * @description  发送请求, 等待返回响应数据
         */
        sendRequest: function(type){
            if(type === undefined){
                return can.Deferred().resolve();
            }
            else if(typeof comm[type] == "function"){
                return comm[type](this.options.requestData[type]);
            }
            else{
                return can.Deferred().reject();
            }
        },


        /**
         * @description  构建(刷新)渲染数据
         */
        setRenderData: function(data, names){
            var cfg = this.options.config;
            var node = this.options.renderData;
            var nameArr = ["RESPONSE"].concat(names||[]);
            $.each(nameArr, function(index){
                if(index == 0){
                    node.attr("CONFIG", cfg);
                }
                if(nameArr.length>1){
                    node=node[nameArr.shift()];
                }
                else if(nameArr.length>0){
                    node.attr(nameArr[0], data);
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
         *     this.isFinish：              参数 --> 模块完成？
         *     this.elementId:              参数 --> DOM元素ID
         *     this.options.config:         参数 --> 模板配置参数
         *     this.options.templates:      参数 --> templates路径
         *     this.options.requestType：   参数 --> 向服务器发送的请求类别
         *     this.options.requestData：   参数 --> 向服务器发送的请求参数
         *     this.options.responseData：  参数 --> response数据（若存在，则不再向服务器发送请求）
         *     this.options.renderData：    参数 --> 渲染模板的数据（通过 this.setRenderData()进行构建）
         */
        init: function(){
            this.isFinish = $.Deferred();
            this.elementId = this.element.attr("id");
            this.options.config = $.extend(true, {}, this.config, this.options.config);
            this.options.templates = this.options.templates || this.templates;
            this.options.requestType = this.options.requestType || this.requestType;
            this.options.requestData = $.extend(true, {}, this.requestData, this.options.requestData);
            this.options.responseData = this.options.responseData || null;
            this.options.renderData = can.Model.extend().model({ CONFIG:{}, RESPONSE:{} });
            this.toRender(this.options.responseData||this.options.requestType);
        }
    })

});