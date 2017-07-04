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
    "component.page.sideFixed.1",
    "bower.css!css.page.sideFixed.1",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-sidefixed-1></page-sidefixed-1>",
        active_offset: 0,
        renderAfterFun: function() {
            var that = this;
            that.setElementCSS();
            var activeOffset = that.options.active_offset || that.active_offset;
            var positionOffset = that.options.position_offset || that.position_offset;
            $('body').scrollMonitor({
                active_offset: activeOffset,
                position_offset: positionOffset,
            });
            $(window).on("resize", function(){
                that.setElementCSS()
            });
        },
        "setElementCSS": function(){
            var bodyWidth = $("body").width();
            var windowHeight = window.innerHeight;
            var thisHeight = this.element.height();
            var width = (bodyWidth-1310)/2;
            var height = (windowHeight-thisHeight)/2;
            height = height>150? height: 150;
            this.active_offset = height;
            if(bodyWidth>=1320){
                this.element.css({
                    "display":"block",
                    "position":"fixed",
                    "top":height+"px",
                    "left": width+"px",
                });
            }else{
                this.element.css({
                    "display":"none",
                });
            }
        },
    })

});