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
            var matchArr = decodeURI(window.location.search).substr(1).match(reg);
            if(matchArr!=null){
                return matchArr[2];
            }else{
                return "";
            }
        },


        /**
         *  @description 设置url参数值, 并返回新的url
         */
        setUrlParam: function(name, value){
            var url=window.location.href ;
            var newUrl="";
            var reg = new RegExp("(^|)"+ name +"=([^&]*)(|$)");
            var param = name + "=" + value;
            var matchArr = decodeURI(window.location.search).substr(1).match(reg);
            if(matchArr!= null){
                newUrl= url.replace(matchArr[0], param);
            }else{
                if(url.match("\\?.")){
                    newUrl= url + "&" + param;
                }
                else if(url.match("\\?")){
                    newUrl= url + param;
                }
                else{
                    newUrl= url + "?" + param;
                }
            }
            return newUrl;
        },


        /**
         *  @description 根据IP获取所在区域
         */
        getRegion: function(){
            return {
                localNationality: "中国",
                localProvince: "浙江",
                localCity: "宁波",
                localArea: "北仑"
            }
        }

    }

});