/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "config.system"
], function($, system){

    return {

        /**
         *  @description  按时间输出log信息
         */
        logOutput: function(id, info){
            if(system.logOutput){
                var now = new Date();
                var hour = now.getHours();
                var minute = now.getMinutes();
                var second = now.getSeconds();
                var millisecond = now.getMilliseconds();
                var gap= "-";
                var len = 30 - id.length;
                for(var i=0; i<len; i++){
                    gap += "-";
                }
                hour = hour>9? hour: "0"+hour;
                minute = minute>9? minute: "0"+minute;
                second = second>9? second: "0"+second;
                millisecond = millisecond>99? millisecond: millisecond>9? "0"+millisecond: "00"+millisecond;
                console.log(hour+":"+minute+":"+second+":"+millisecond + " " + id + ": " + gap + " " + info);
            }
        },


        /**
         *  @description  判断是否为数组
         */
        isArray: function(o){
            return Object.prototype.toString.call(o) === '[object Array]';
        },


        /**
         *  @description 操作url参数值
         *      getUrlParam:  得到url参数值
         *      setUrlParam： 设置url参数值: action为 add(cover)时,添加(刷新)当前页记录
         *      delUrlParam： 删除url参数值: action为 add(cover)时,添加(刷新)当前页记录
         */
        getUrlParam: function(name){
            var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|(?=&)|$)");
            var matchArr = decodeURI(window.location.search).substr(1).match(reg);
            if(matchArr!=null){
                return matchArr[2].substr(1);
            }else{
                return "";
            }
        },
        setUrlParam: function(obj, action, historyState){
            var that = this;
            var newUrl = "";
            var newSearch = "";
            var state = historyState || { historyName: name };
            $.each(obj,function(name, value){
                var url = newUrl? decodeURI(newUrl): decodeURI(window.location.href);
                var search = newSearch? decodeURI(newSearch): decodeURI(window.location.search);
                var param = value!=null? name + "=" + encodeURI(value): name;
                var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|(?=&)|$)");
                var matchArr = decodeURI(search).substr(1).match(reg);
                if(matchArr!= null){
                    if(matchArr[0][0] == "&"){
                        newSearch = search.replace(matchArr[0].substr(1), param);
                        newUrl= url.replace(matchArr[0].substr(1), param);
                    }else{
                        newSearch = search.replace(matchArr[0], param);
                        newUrl= url.replace(matchArr[0], param);
                    }
                }else{
                    if(url.match("\\?.*[^&]$")){
                        newSearch = search + "&" + param;
                        newUrl= url + "&" + param;
                    }
                    else if(url.match("\\?.*")){
                        newSearch = search + param;
                        newUrl= url + param;
                    }
                    else{
                        newSearch = search + "?" + param;
                        newUrl= url + "?" + param;
                    }
                }
            });
            if(action == "add"){
                that.pushState(state, "", newUrl);
            }
            if(action == "cover"){
                that.replaceState(state, "", newUrl);
            }
        },
        delUrlParam: function(arr, action, historyState){
            var that = this;
            var newUrl = "";
            var newSearch = "";
            var state = historyState || { historyName: name };
            var protocol = location.protocol? location.protocol+"//": "";
            var hostname = location.hostname? location.hostname: "";
            var port = location.port? ":"+location.port: "";
            var pathname = location.pathname;
            if(arr.length == 0){
                newUrl= protocol+hostname+port+pathname;
            }else{
                $.each(arr, function(i, name){
                    var url = newUrl? decodeURI(newUrl): decodeURI(window.location.href);
                    var search = newSearch? decodeURI(newSearch): decodeURI(window.location.search);
                    var reg = new RegExp("(^|&)"+ name +"((=[^&]*)|(?=&)|$)");
                    var matchArr = decodeURI(search).substr(1).match(reg);
                    if(matchArr!= null){
                        newUrl= url.replace(matchArr[0], "");
                    }
                });
                if(action == "cover"){
                    that.replaceState(state, "", newUrl);
                }
                if(action == "add"){
                    that.pushState(state, "", newUrl);
                }
            }
        },


        /**
         *  @description
         *      pushState:    向游览器添加当前页记录
         *      replaceState: 向游览器覆盖当前页记录
         */
        pushState: function(state, title, url){
            if('pushState' in window.history){
                history.pushState(state, title, url);
            }
        },
        replaceState: function(state, title, url){
            if('replaceState' in window.history){
                history.replaceState(state, title, url);
            }
        },


        /**
         *  @description 根据IP获取所在区域
         */
        getRegion: function(){
            return {
                LOCAL_NATIONALITY: "中国",
                LOCAL_PROVINCE: "浙江",
                LOCAL_CITY: "宁波",
                LOCAL_AREA: "北仑"
            }
        }

    }

});