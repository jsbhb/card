/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
    "bower.jquery",
    "bower.bootstrap.min",
    "bower.can",
    "bower.dotdotdot.min",
    "widget.common",
    "config.system",
    "config.helper",
    "model.comm",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.company.1",
    "control.page.footer.1"
], function(
    cssAwesome, cssBootstrap, cssUFont,
    $, bootstrap, can, dot,
    common,
    system, helper,
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
    var localCity =   common.getRegion().localCity;
    var memberId =    common.getUrlParam("memberId");
    var currentPage = common.getUrlParam("currentPage");

    common.logOutput("visit-company", "加载页面模块...");

    var top = new pageTop1("#load-pageTop",{
        responseData: {
            localCity: localCity
        }
    });
    var header = new pageHeader1("#load-pageHeader",{
        config: {
            searchCont: "",
            searchList:[
                { type: 1, name: "企业", active: "active" },
                { type: 2, name: "商品", active: null }
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
            queryCompany:{
                id: memberId
            },
            queryShop:{
                memberId: memberId,
                currentPage: currentPage>0?currentPage:1
            }
        }
    });
    var footer = new pageFooter1("#load-pageFooter");

    $.when(
        top.state,
        header.state,
        nav.state,
        company.state,
        footer.state
    ).done(function(){
        common.logOutput("visit-company", "启用页面事件...");
        enableEvents(header, company);
    });



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header, company){

        /** @description:
         *     1、设置历史状态（数据）
         *     2、得到历史状态（数据）
         *     3、更新 url值（数据）
         *     4、页面加载,设定历史状态、更新 url值
         */
        var historyState = {};
        function setHistoryState(){
            historyState = {
                config: {
                    header: header.options.config,
                    company: company.options.config
                },
                requestData: {
                    header: header.options.requestData,
                    company: company.options.requestData
                }
            }
        }
        function getHistoryState(state){
            header.options.config = state.config.header || {};
            header.options.requestData = state.requestData.header|| {};
            company.options.config = state.config.company || {};
            company.options.requestData = state.requestData.company|| {};
        }
        function setHistory(state, type){
            var queryShop = company.options.renderData.RESPONSE.queryShop;
            var pagination = queryShop && queryShop.pagination;
            var currentPage = pagination && pagination.currentPage || 1;
            common.setUrlParam(
                { "currentPage":  currentPage },
                type,
                state
            )
        }
        setHistoryState();
        setHistory(historyState, "cover");


        /** @description:   模拟游览器前进后退的事件
         */
        window.onpopstate = function(e) {
            if( e && e.state &&
                e.state.config &&
                e.state.requestData
            ){
                getHistoryState(e.state);
                company.toRender("queryShop/shop/commoditySearchList");
                $.when(company.state).done(function(){
                    setHistory(e.state, "cover");
                });
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
                if(type == 1){
                    if(location.pathname!= "/app/webpage/searchCompany.html"){
                        location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                    }
                }
                else if(type == 2){
                    if(location.pathname!= "/app/webpage/searchShop.html"){
                        location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
                    }
                }
            });

        $(company.element)
            .on("click",
                ".shopClassify a," +
                ".companySort a," +
                "li.pagination_page>a.pagination_btn", function(){
                    can.when(company.state)
                        .done(function(){
                            setHistoryState();
                            setHistory(historyState, "add");
                        })
                });

    }

});
