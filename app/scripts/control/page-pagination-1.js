/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "widget.common",
    "config.render",
    "component.page.pagination.1",
    "bower.css!css.page.pagination.1"
], function($, can, common, Render){

    return Render.extend({
        //子类扩展
        template: "<page-pagination-1></page-pagination-1>",
        config: {},
        region: {
            pagination: {
                path: "RESPONSE",
                dynamic: true
            }
        },
        requestData: {},
        requestType: [],


        //自定义方法


        //自定义事件
        "li.pagination_page>a.pagination_btn click": function(node){
            var $node = $(node);
            var currentPage = this.options.renderData.RESPONSE.currentPage*1;
            var totalPages = this.options.renderData.RESPONSE.totalPages*1;
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
                this.options.parentObj.callback(currentPage);
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
            var totalPages = this.options.renderData.RESPONSE.totalPages*1;
            var tempVal = val ? val.replace(/\D+/gi, "") : "";

            if (tempVal == "" || tempVal < 1 ) {
                tempVal = 1;
            }else if (tempVal > totalPages) {
                tempVal = totalPages;
            }
            this.options.renderData.RESPONSE.attr("currentPage", tempVal);
        },
        "li.pagination_page>input.pagination_searchText propertychange": function(node) {
            var $node = $(node);
            var val = $node.val();
            var totalPages = this.options.renderData.RESPONSE.totalPages*1;
            var tempVal = val ? val.replace(/\D+/gi, "") : "";

            if (tempVal == "" || tempVal < 1 ) {
                tempVal = 1;
            }else if (tempVal > totalPages) {
                tempVal = totalPages;
            }
            this.options.renderData.RESPONSE.attr("currentPage", tempVal);
        }

    })

});