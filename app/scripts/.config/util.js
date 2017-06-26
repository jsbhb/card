/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
], function($, _){

    return {

        /**
         *  @description 读取url参数值
         */
        getUrlParam: function(name){
            var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
            var r = decodeURI(window.location.search).substr(1).match(reg);
            if(r!=null){
                return r[2];
            }else{
                return "";
            }
        }

    }

});