/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "bower.text!template.page.searchCompany.1.mustache"
], function($, can, template){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-searchcompany-1",
        template: template,
        helpers:{
            removeFontTag: function(count){
                var tempCount = typeof count==='function'? count(): count;
                (tempCount !== null) &&
                (tempCount !== undefined) &&
                (tempCount = tempCount.replace(/<font.+>|<\/font>/,"").trim());
                return tempCount;
            }
        },
        scope:{
        },
        events:{
        }
    })
});