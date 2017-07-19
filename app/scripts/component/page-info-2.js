/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.text!template.page.info.2.mustache"
], function($, can, template){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-info-2",
        template: template,
        helpers: {
            isFirst: function(val, options){
                var tempVal = typeof val=='function'? val(): val;
                return tempVal===0? options.fn(options.context): null;
            },
            notFirst: function(val, options){
                var tempVal = typeof val==='function'? val(): val;
                return tempVal!==0? options.fn(options.context): null;
            },
            parsefloat: function(val){
                var tempVal = typeof val=='function'? val(): val;
                return "￥"+parseFloat(tempVal).toFixed(2);
            }
        },
        scope: {
        },
        events: {
        }
    })
});