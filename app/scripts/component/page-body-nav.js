/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "jquery",
    "underscore",
    "can"
], function($, _, can){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-body-nav",
        template: can.view("templates.page.body.nav.mustache"),
        helpers: {

        },
        scope: {
            css: {
                navRightContent2: "display: none",
            },
            fn: {
                banner: function(){
                }
            }
        },
        events: {
            ".navLeft li mouseenter": function(elements, event){
                var css_top = {"top": "0px","bottom": "auto","display": "block"};
                var css_bottom = {"top": "auto","bottom": "0px","display": "block" };
                var index = $(elements[0]).attr("item-index")*1;
                index<5?
                    this.scope.css.attr("navRightContent2", css_top):
                    this.scope.css.attr("navRightContent2", css_bottom);
                $("[item-index]").removeClass("hover");
                $(elements[0]).addClass("hover");
            },
            ".navContent, .navRightContent2 mouseleave": function(elements, event){
                var css_none = {"display": "none"};
                this.scope.css.attr("navRightContent2", css_none);
                $("[item-index]").removeClass("hover");
                event && event.stopPropagation();
            }
        }
    })

})