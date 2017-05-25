/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can",
    "comm.model",
    "fixture.test"
], function($, _, can, Comm){

    /** Model
     *   @description 模型
     *   @findNav  查询Nav数据
     */
    var Model = new Comm({
        findNav: function(){
            return this.sendRequest({
                url: "/card/findNav",
                type: "get"
            })
        }
    });

    /** Component
     *   @description: 模板组件
     */
    can.Component.extend({
        tag: "page-body-nav",
        scope: {
            content_css: "display: none",
        },
        template: can.view("page-body-nav.mustache"),
        helpers: {
            // func: function(items,options){
            //    ... ...
            //    return options.fn(options.contexts || this);
            // }
        },
        events: {
            ".nav_left li mouseenter": function(elements, event){
                var css_top = {"top": "0px","bottom": "auto","display": "block"};
                var css_bottom = {"top": "auto","bottom": "0px","display": "block" };
                var index = $(elements[0]).attr("item-index")*1;
                index<5?this.scope.attr("content_css", css_top):this.scope.attr("content_css", css_bottom);
                $("[item-index]").removeClass("hover");
                $(elements[0]).addClass("hover");
            },
            ".page-body-nav-content, .nav_center_content2 mouseleave": function(elements, event){
                this.scope.attr("content_css", "display: none");
                $("[item-index]").removeClass("hover");
                event && event.stopPropagation();
            }
        }
    })

    /** Control
     *   @description: 发起请求，返回数据，处理模板并渲染输出
     *   @param:
     *      loadPage: 创建模板节点, 自动调用相应的模板组件
     *      mapData: 封装成can.Map类型的responseData数据, 以便起到监听作用, 实现动态渲染
     */
    var Control = can.Control.extend({
        init: function(){
            can.when(Model.findNav()).done(
                $.proxy(function(responseData){
                    this.options.loadPage = "<page-body-nav></page-body-nav>";
                    this.options.mapData = new can.Map(responseData);
                    this.element.html(can.mustache(this.options.loadPage)(this.options.mapData));
                },this)
            )
        }
    })

    new Control(".load-page-body-nav");

})