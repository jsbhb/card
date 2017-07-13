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


        /**
         * @description
         *     --> 1.向服务器发送请求    --> 2.获取数据, 执行渲染前事件
         *     --> 3.构建(刷新)渲染数据  --> 4.渲染模板, 添加至DOM元素内
         *     --> 5.执行渲染后事件
         */
        toRender: function(types){
            var that = this;
            var deferreds = [];
            this.isFinish = $.Deferred();
            $.each([].concat(types), function(key, map){
                var typeIsString = typeof map.type === "string";
                var dataIsExist =  typeof map.type !== "undefined";
                var pathIsString = typeof map.path === "string";
                var dynamicIsUndefined = typeof map.dynamic === "undefined";
                map.type = dataIsExist? undefined: typeIsString? map.type: "none";
                map.dynamic = dynamicIsUndefined? true: !!map.dynamic;
                map.path = pathIsString? map.path: undefined;
                deferreds[i] = that.sendRequest(map.type)
                    .done(function(responseData){
                        var isSuccess = responseData && responseData.success;
                        map.data = dataIsExist? map.data: isSuccess? responseData.obj: null;
                        common.logOutput(that.elementId, "构建渲染数据: "+map.type||"noQuery");
                        that.setRenderData(map);
                        common.logOutput(that.elementId, "已构建渲染数据");
                    })
            });
            can.when.apply(null, deferreds)
                .always(function() {
                    common.logOutput(that.elementId, "执行渲染前事件");
                    that.renderBeforeFunc();
                    common.logOutput(that.elementId, "渲染模板至DOM元素内");
                    that.render();
                    common.logOutput(that.elementId, "执行渲染后事件");
                    that.renderAfterFunc();
                    that.isFinish.resolve();
                });
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
        setRenderData: function(map){
            var cfg = this.options.config;
            var node = this.options.renderData;
            var name = map? map.split("/"): ["RESPONSE"];
            $.each(name, function(index){
                if(name[0] != "RESPONSE"){
                    name = ["RESPONSE"].concat(name);
                }
                if(index == 0){
                    node.attr("CONFIG", cfg);
                }
                if(name.length>1){
                    node=node[name.shift()];
                }
                if(name.length == 0 && map.dynamic){
                    node.attr(name[0], map.data);
                }
                if(name.length == 0 && !map.dynamic){
                    node[name[0]] = map.data;
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