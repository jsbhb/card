/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-info-2",
        template: can.view("templates.page.info.2.mustache"),
        helpers: {
            isFirst: function(val, options){
                if(val()==0){
                    return options.fn(options.context)
                }else{
                    return null;
                }
            },
            notFirst: function(val, options){
                if(val()!=0){
                    return options.fn(options.context)
                }else{
                    return null;
                }
            },
            parsefloat: function(val){
                return "￥"+parseFloat(val()).toFixed(2);
            }
        },
        scope: {
        },
        events: {
        }
    })
})