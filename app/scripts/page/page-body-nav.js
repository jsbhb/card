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
], function($, _, can, Comm){

    //Model
    var Model = new Comm({

        /**
         * @description 查询所处市区
         */
        findNav: function(){
            return this.sendRequest({
                url: "",
                type: "get"
            })
        }

    });

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
            var that = this;
            can.when(true).done(function(responseData){
                that.element.html(can.view("page-body-nav.mustache", responseData, that.helper));
            })
        }

    })

    return new Control(".load-page-body-nav");

})