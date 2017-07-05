/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "comm.collect",
    "fixture.test"
], function($, _, can, comm){

    /**
     * @description:  创建render基类
     */
    return can.Control.extend({

        /**
         * @config:           模板参数（用于子类扩展）
         * @templatesPath:    模板路径（用于子类扩展）
         * @requestType:      请求类型（用于子类扩展）
         * @requestData:      请求参数（用于子类扩展）
         * @renderBeforeFun:  渲染前事件（用于子类扩展）
         * @renderAfterFun:   渲染后事件（用于子类扩展）
         */
        config:          {},
        templatesPath:   "",
        requestType:     null,
        requestData:     {},
        renderBeforeFun: function(){},
        renderAfterFun:  function(){},



        /**
         * @description  1、若type为 responseData： 构建渲染数据 --> 渲染模板
         *               2、若type为 requestType：  向后台发起请求 --> 构建渲染数据 --> 渲染模板
         */
        toRender: function(){
            var deferred = can.Deferred();
            if(this.options.responseData){
                this.setRenderData(this.options.responseData);
                this.render(deferred);
            }
            else if(this.options.requestType){
                can.when(this.sendRequest(this.options.requestType))
                    .done(
                        $.proxy(function(responseData){
                            if(responseData && responseData.success){
                                this.setRenderData(responseData.obj);
                                this.render(deferred);
                            }
                        },this)
                    )
            }
            else{
                this.setRenderData();
                this.render(deferred);
            }
            return deferred;
        },



        /**
         * @description 发送请求，返回响应数据
         */
        sendRequest: function(type){
            if(type == null){
                return can.Deferred().resolve();
            }
            else if(typeof comm[type] == "function"){
                return comm[type](this.options.requestData[type]||{});
            }
            else{
                return can.Deferred().reject();
            }
        },



        /**
         * @description 构建渲染数据
         */
        setRenderData: function(renderData, nodes){
            var renderNode = this.options.renderData;
            nodes? nodes.unshift(["RESPONSEDATA"]): nodes = ["RESPONSEDATA"];
            this.options.renderData.attr("CONFIG", this.options.config);
            $.each(nodes, function(){
                if(nodes.length>1){ renderNode = renderNode[nodes.shift()]; }
                if(nodes.length==1){ renderNode.attr(nodes[0], renderData); }
            })
        },



        /**
         * @description 渲染模板
         */
        render: function(deferred){
            this.element.html(
                can.mustache(this.options.templates)(this.options.renderData)
            );
            deferred.resolve();
        },



        /**
         * @description 初始化
         *   this.options.config:         模板参数
         *   this.options.templates:      templates路径
         *   this.options.requestType：   comm请求类别
         *   this.options.requestData：   向服务器发送请求参数
         *   this.options.responseData：  response数据（若存在，则不再向服务器发送请求）
         *   this.options.renderData：    渲染模板的数据（通过 this.setRenderData()进行构建）
         *   this.renderBeforeFun:       渲染前的事件
         *   this.toRender：             发起请求 --> 构建渲染数据 --> 渲染模板
         *   this.renderAfterFun:        渲染后的事件
         */
        init: function(){
            this.options.config = $.extend(true, {}, this.config, this.options.config);
            this.options.templates = this.options.templates || this.templatesPath;
            this.options.requestType = this.options.requestType || this.requestType;
            this.options.requestData = $.extend(true, {}, this.requestData, this.options.requestData);
            this.options.responseData = this.options.responseData || null;
            this.options.renderData = new can.Model({ CONFIG:{}, RESPONSEDATA:{} });
            this.renderBeforeFun();
            can.when(this.toRender())
                .done(
                    $.proxy(function(){ this.renderAfterFun() }, this)
                );
        }
    })

});