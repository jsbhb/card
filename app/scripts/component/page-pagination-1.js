/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "widget.common"
], function($, _, can, common){

    /** @description: 模板组件
     */
    return can.Component.extend({
        tag: "page-pagination-1",
        template: can.view("templates.page.pagination.1.mustache"),
        helpers: {
            dataProcessing: function(responseData, options){
                var data = typeof responseData == "function"? responseData(): responseData;
                var pageList = [];
                var currentPage = data.currentPage*1;
                var totalPages = data.totalPages*1;
                var newUrl = common.setUrlParam("currentPage", currentPage);
                history.replaceState({"currentPage": currentPage}, "", newUrl);
                if(totalPages<13){
                    for(var i=0;i<totalPages;i++){
                        pageList[i] = {
                            page: i+1,
                            jumpBtn: i+1,
                            active: (i+1) == currentPage? "active": null,
                            ellipsis: false,
                        };
                    }
                }
                else{
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
                data.attr("pageList", pageList);
                return options.fn(data);
            }
        },
        scope: {
        },
        events:{
        }
    })

});