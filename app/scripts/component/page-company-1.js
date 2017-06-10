/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "component.page.pagination",
    "bower.css!css.page.pagination",
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-company-1",
        template: can.view("templates.page.company.1.mustache"),
        helpers:{
        },
        scope:{

        },
        events:{

        },
        init: function(element){
            this.scope.attr("$pagination", $(element).find(".paging"));
            this.scope.$pagination.pagination({
                page:20,
                total:1,
                test:true
            });
        }
    })
})