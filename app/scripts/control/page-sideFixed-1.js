/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.sideFixed.1",
    "bower.css!css.page.sideFixed.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-sidefixed-1></page-sidefixed-1>",
        config: {},
        region: {
            RESPONSE: {
                afterFunc: function(that) {
                    that.setElementCSS();
                    var activeOffset = that.options.active_offset || 0;
                    var positionOffset = that.options.position_offset || 15;
                    $('body').scrollMonitor({
                        active_offset: activeOffset,
                        position_offset: positionOffset
                    });
                    $(window).on("resize", function(){
                        that.setElementCSS()
                    });
                }
            }
        },
        requestData: {},
        requestType: [],


        //自定义方法
        setElementCSS: function(){
            var bodyWidth = $("body").width();
            var windowHeight = window.innerHeight;
            var thisHeight = this.element.height();
            var width = (bodyWidth-1310)/2;
            var height = (windowHeight-thisHeight)/2;
            height = height>150? height: 150;
            this.options.active_offset = height;
            if(bodyWidth>=1320){
                this.element.css({
                    "display": "block",
                    "position": "fixed",
                    "top": height+"px",
                    "left": width+"px"
                });
            }else{
                this.element.css({
                    "display":"none"
                });
            }
        }


        //自定义事件

    })

});