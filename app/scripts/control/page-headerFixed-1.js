/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.headerFixed.1",
    "bower.css!css.page.headerFixed.1",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-headerfixed-1></page-headerfixed-1>",
        timer: null,
        renderAfterFun: function() {
            var that = this;
            that.setElementCSS();
            that.isHeaderFixed();
            $(window).on("scroll", function(){ that.isHeaderFixed(); })
        },
        "setElementCSS": function(){
            this.element.css({
                "width": "100%",
                height:  "52px",
                "position": "fixed",
                "top": "0px",
                "left": "0px",
                "z-index": 1500,
                "display": "block",
                "background-color": "rgba(255, 255, 255, .952)",
                "border-bottom": "solid 2px #ff4200",
                "box-shadow": "0 2px 4px rgba(0, 0, 0, .15)",
                "-webkit-box-shadow": "0 2px 4px rgba(0, 0, 0,.15)",
            });
        },
        "isHeaderFixed": function(){
            var that = this;
            clearTimeout(this.timer);
            this.element.stop(true, true);
            this.element.css({
                "top": "-54px" ,
                "box-shadow": "none",
                "-webkit-box-shadow": "none",
            });
            setTimeout(function(){
                if($(window).scrollTop()>200){
                    that.element.css({
                        "box-shadow": "0 2px 5px rgba(0, 0, 0, .15)",
                        "-webkit-box-shadow": "0 2px rgba(0, 0, 0,.15)",
                    });
                    that.element.animate({ "top": "0px" }, 550);
                }
            }, 300)
        },

    })

});