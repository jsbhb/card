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
], function($, _, can, Comm, Render){

    //Control
    var Control = can.Control.extend({

        /**
         * @description 全局helper
         */
        helper: {},

        /**
         * @description 初始化
         */
        init: function(){
            this.render();
        },

        /**
         * @description 渲染
         */
        render: function() {
            this.element.html(can.view("page-header-center.mustache", {}, this.helper));
        }

    })

    return new Control(".load-page-header-center");

})