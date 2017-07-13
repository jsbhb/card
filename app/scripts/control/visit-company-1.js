/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.bootstrap.min",
    "bower.can",
    "bower.dotdotdot.min",
    "widget.common",
    "config.system",
    "model.comm",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.company.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont"
], function(
    $, bootstrap, can, dot,
    common,
    system,
    comm,
    pageTop1,
    pageHeader1,
    pageNav1,
    pageCompany1,
    pageFooter1){


    /** @description:   新建页面元素（确认页面所需模块）
     */
    common.logOutput("visit-company", "新建页面元素");
    var C_SHORT =     "short";
    var E_TOP =       $("<div id='load-pageTop'></div>");
    var E_HEADER =    $("<div id='load-pageHeader'></div>");
    var E_NAV =       $("<div id='load-pageNav'></div>");
    var E_BODY =      $("<div id='load-pageBody' style='min-height:450px'></div>");
    var E_FOOTER =    $("<div id='load-pageFooter'></div>");
    var E_COMPANY =   $("<div id='load-pageCompany'></div>");

    $("body")
        .addClass(C_SHORT)
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);
    $(E_BODY)
        .append(E_COMPANY);



    /** @description:
     *       --> 获取页面数据
     *       --> 加载页面模块
     *       --> 启用页面事件
     */
    common.logOutput("visit-company", "获取页面数据");
    var LOCAL_CITY = common.getRegion().LOCAL_CITY;
    var memberId =   common.getUrlParam("memberId");

    var top = new pageTop1("#load-pageTop",{
        responseData: {
            LOCAL_CITY: LOCAL_CITY
        }
    });
    var header = new pageHeader1("#load-pageHeader",{
        config: {
            searchCont: "",
            searchList:[
                { type: 1, name: "企业", active: null },
                { type: 2, name: "商品", active: "active" }
            ]
        }
    });
    var nav = new pageNav1("#load-pageNav",{
        config:{
            border: "border"
        }
    });
    var company = new pageCompany1("#load-pageCompany",{
        requestData: {
            queryCompany:{ id: memberId },
            queryShop:{ memberId: memberId }
        }
    });
    var footer = new pageFooter1("#load-pageFooter");

    $.when(
        top.isFinish,
        header.isFinish,
        nav.isFinish,
        company.isFinish,
        footer.isFinish
    ).done(function(){
        common.logOutput("visit-searchCompany", "启用页面事件...");
        enableEvents(header, company);
    });



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header, company){

        /** @description: 操作游览器历史纪录
         */
        var historyState = {
            config: {
            },
            requestData: {
            }
        };
        function getHistoryState(state){
        }
        function setHistoryState(state, type){
        }
        window.onpopstate = function(e) {
            if( e && e.state && e.state.config && e.state.requestData ){
                getHistoryState(e.state);
                setHistoryState(e.state,"cover");
            }
        };


        /** @description:   模块触发交互事件
         */
        $(header.element)
            .on("input propertychange", ".input-search", function(){
                var $node = $(this);
                var searchCont = $node.val();
                var $header = header.element;
                var header_config = header.options.renderData.CONFIG;
                if(searchCont!==""){
                    $($header).find(".placeholderIcon").css("display","none");
                }
                else{
                    $($header).find(".placeholderIcon").css("display","block");
                }
                header.options.config.searchCont = searchCont;
                header_config.attr("searchCont", searchCont);
            });

        $(header.element)
            .on("click", ".searchType>[searchType]", function(){
                var $node = $(this);
                var searchType = $node.attr("searchType");
                var header_config = header.options.renderData.CONFIG;
                $.each(header_config.searchList, function(i, map){
                    if(searchType == map.attr("type")){
                        map.attr("active", "active")
                    }
                    else{
                        map.attr("active", null)
                    }
                });
            });

        $(header.element)
            .on("click", ".btn-search", function(){
                var $node = $(this);
                var type = $node.parent().parent().parent().find(".active[searchType]").attr("searchType");
                var cont = $node.parent().parent().parent().find(".input-search").val().trim();
                if(type == "1"){
                    if(location.pathname!= "/app/webpage/searchCompany.html"){
                        location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                    }
                }
                else if(type == "2"){
                    if(location.pathname!= "/app/webpage/searchShop.html"){
                        location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
                    }
                }
            });


    }

});
