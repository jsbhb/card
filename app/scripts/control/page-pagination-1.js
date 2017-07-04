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
    "component.page.pagination.1",
    "bower.css!css.page.pagination.1",
], function($, _, can, common, Render){

    return Render.extend({
        //子类扩展
        templatesPath: "<page-pagination-1></page-pagination-1>",
        renderBeforeFun: function(){
            this.options.parentRequestType = this.options.parentObj.requestType;
            this.options.parentRequestData = this.options.parentObj.options.requestData;
            this.options.parentResponseData = this.options.parentObj.options.renderData.RESPONSEDATA;
            this.dataProcessing(this.options.parentResponseData.pagination);
        },
        dataProcessing: function(responseData){
            if(!responseData){ return }
            var pageList = [];
            var currentPage = responseData.currentPage*1;
            var totalPages = responseData.totalPages*1;
            var newUrl = common.setUrlParam("currentPage", currentPage);
            if(totalPages<13){
                for(var i=0;i<totalPages;i++){
                    pageList[i] = {
                        page: i+1,
                        jumpBtn: i+1,
                        active: (i+1) == currentPage? "active": null,
                        ellipsis: false,
                    };
                }
            }else{
                if(currentPage<7){
                    for(var i=0;i<8;i++){
                        pageList[i] = {
                            page: i+1,
                            jumpBtn: i+1,
                            active: (i+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                    pageList[8] = {
                        page: null,
                        jumpBtn: null,
                        ellipsis: true,
                    };
                    for(var i=9,j=1; j>-1; i++,j--){
                        pageList[i] = {
                            page: totalPages-j,
                            jumpBtn: totalPages-j,
                            active: (totalPages-j) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                }
                else if(currentPage>totalPages-6){
                    for(var i=0;i<2;i++){
                        pageList[i] = {
                            page: i+1,
                            jumpBtn: i+1,
                            active: (i+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                    pageList[2] = {
                        page: null,
                        jumpBtn: null,
                        ellipsis: true,
                    };
                    for(var i=3,j=totalPages-8; j<totalPages; i++,j++){
                        pageList[i] = {
                            page: j+1,
                            jumpBtn: j+1,
                            active: (j+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                }
                else{
                    for(var i=0;i<2;i++){
                        pageList[i] = {
                            page: i+1,
                            jumpBtn: i+1,
                            active: (i+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                    pageList[2] = {
                        page: null,
                        jumpBtn: null,
                        ellipsis: true,
                    };
                    for(var i=3,j=currentPage-3; j<currentPage+2; i++,j++){
                        pageList[i] = {
                            page: j+1,
                            jumpBtn: j+1,
                            active: (j+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                    pageList[8] = {
                        page: null,
                        jumpBtn: null,
                        ellipsis: true,
                    };
                    for(var i=9,j=1; j>-1; i++,j--){
                        pageList[i] = {
                            page: totalPages-j,
                            jumpBtn: totalPages-j,
                            active: (totalPages-j) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                }
            }
            responseData.attr("pageList", pageList);
            this.setRenderData(responseData);
            history.replaceState({"currentPage": currentPage}, "", newUrl);
        },


        //事件
        "li.pagination_page>a.pagination_btn click": function(node){
            var that = this;
            var $node = $(node);
            var currentPage = this.options.renderData.RESPONSEDATA.currentPage*1;
            var totalPages = this.options.renderData.RESPONSEDATA.totalPages*1;
            var activePage = $node.parent().parent().find(">li.active>a[jumpbtn]").attr("jumpbtn");
            if($node.hasClass("prevBtn")){
                currentPage = currentPage > 1? currentPage-1: currentPage;
            }else if($node.hasClass("nextBtn")){
                currentPage = currentPage < totalPages? currentPage+1: currentPage;
            }else if($node.hasClass("searchBtn")){
                currentPage = $node.parent().parent().find(".pagination_searchText").val();
            }else{
                currentPage = $node.attr("jumpBtn");
            }
            if(activePage != currentPage){
                var requestType = { currentPage: currentPage };
                $.extend(true, this.options.parentRequestData[this.options.parentRequestType], requestType);
                this.options.parentObj.callback();
            }
        },
        "li.pagination_page>input.pagination_searchText keydown": function(node,e){
            var $node = $(node);
            var event = e || window.event;
            var keyCode = event.which || event.keyCode;
            if(keyCode == 13){
                $node.parent().parent().find(".searchBtn").click();
            }
        },
        "li.pagination_page>input.pagination_searchText input": function(node) {
            var $node = $(node);
            var val = $node.val();
            var totalPages = this.options.renderData.RESPONSEDATA.totalPages*1;
            var tempVal = val ? val.replace(/\D+/gi, "") : "";

            if (tempVal == "" || tempVal < 1 ) {
                tempVal = 1;
            }else if (tempVal > totalPages) {
                tempVal = totalPages;
            }
            this.options.renderData.RESPONSEDATA.attr("currentPage", tempVal);
        },
        "li.pagination_page>input.pagination_searchText propertychange": function(node) {
            var $node = $(node);
            var val = $node.val();
            var totalPages = this.options.renderData.RESPONSEDATA.totalPages*1;
            var tempVal = val ? val.replace(/\D+/gi, "") : "";

            if (tempVal == "" || tempVal < 1 ) {
                tempVal = 1;
            }else if (tempVal > totalPages) {
                tempVal = totalPages;
            }
            this.options.renderData.RESPONSEDATA.attr("currentPage", tempVal);
        }

    })

});