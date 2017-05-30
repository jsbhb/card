/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-body-infoa",
        template: can.view("templates.page.body.infoA.mustache"),
        helpers: {
            isShow: function(val, count, options){
                if(val()>count-1){
                    return options.inverse(options.context);
                }
                else{
                    return options.fn(options.context);
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