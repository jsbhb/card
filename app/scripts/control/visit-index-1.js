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
    "widget.scrollMonitor",
    "config.system",
    "config.helper",
    "model.comm",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.headerFixed.1",
    "control.page.nav.1",
    "control.page.banner.1",
    "control.page.info.1",
    "control.page.info.2",
    "control.page.sideFixed.1",
    "control.page.footer.1"
], function(
    cssAwesome, cssBootstrap, cssUFont,
    $, bootstrap, can, dot,
    common, scrollMonitor,
    system, helper,
    comm,
    pageTop1,
    pageHeader1,
    pageHeaderFixed1,
    pageNav1,
    pageBanner1,
    pageInfo1,
    pageInfo2,
    pageSideFixed1,
    pageFooter1){


    /** @description:   新建页面元素（确认页面所需模块）
     */
    common.logOutput("visit-index", "新建页面元素");
    var C_SHORT =         "short";
    var E_HTML =          "body";
    var E_TOP =           $("<div id='load-pageTop'></div>");
    var E_HEADER =        $("<div id='load-pageHeader'></div>");
    var E_HEADER_FIXED =  $("<div id='load-pageHeaderFixed'></div>");
    var E_NAV =           $("<div id='load-pageNav'></div>");
    var E_BANNER =        $("<div id='load-pageBanner'></div>");
    var E_BODY =          $("<div id='load-pageBody' style='min-height:450px'></div>");
    var E_SideFixed =     $("<div id='load-pageSideFixed'></div>");
    var E_FOOTER =        $("<div id='load-pageFooter'></div>");
    var E_INFO1 =         $("<div id='load-pageInfo1'></div>");
    var E_INFO2 =         $("<div id='load-pageInfo2'></div>");
    var E_INFO3 =         $("<div id='load-pageInfo3'></div>");
    var E_INFO4 =         $("<div id='load-pageInfo4'></div>");

    $(E_HTML)
        .addClass(C_SHORT)
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_HEADER_FIXED)
        .append(E_NAV)
        .append(E_BANNER)
        .append(E_BODY)
        .append(E_SideFixed)
        .append(E_FOOTER);
    $(E_BODY)
        .append(E_INFO1)
        .append(E_INFO2)
        .append(E_INFO3)
        .append(E_INFO4);



    /** @description:
     *       --> 获取页面数据
     *       --> 加载页面模块
     *       --> 启用页面事件
     */
    common.logOutput("visit-index", "获取页面数据");
    can.when(comm.queryIndex()).done(function(responseData){
        if (responseData && responseData.success) {
            var dataObj = responseData.obj;
            var localCity = common.getRegion().localCity;
            var INDEX_BANNER = dataObj.INDEX_BANNER;
            var MEMBER_PRODUCT_POPULARIZE = dataObj.MEMBER_PRODUCT_POPULARIZE_1;
            var MEMBER_POPULARIZE = dataObj.MEMBER_POPULARIZE_1;
            var PRODUCT_POPULARIZE = dataObj.PRODUCT_POPULARIZE_1;

            common.logOutput("visit-index", "加载页面模块...");

            var top = new pageTop1("#load-pageTop",{
                config: {
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
            var headerFixed = new pageHeaderFixed1("#load-pageHeaderFixed",{
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
                    showed: "showed"
                }
            });
            var banner = new pageBanner1("#load-pageBanner",{
                response: {
                    data: { INDEX_BANNER: INDEX_BANNER },
                }
            });
            var info1 = new pageInfo1("#load-pageInfo1",{
                response: {
                    data: {
                        MEMBER_PRODUCT_POPULARIZE: MEMBER_PRODUCT_POPULARIZE,
                        MEMBER_POPULARIZE: MEMBER_POPULARIZE
                    }
                }
            });
            var info2 = new pageInfo2("#load-pageInfo2",{
                response: {
                    data: { PRODUCT_POPULARIZE: PRODUCT_POPULARIZE }
                }
            });
            var sideFixed = new pageSideFixed1("#load-pageSideFixed",{
                config: {
                    list: [
                        {"name":"货源市场", "id":"load-pageNav", "toTop": true},
                        {"name":"新品推荐", "id":"load-pageInfo1"},
                        {"name":"热卖产品", "id":"load-pageInfo2"}
                    ]
                },
                position_offset: 60
            });
            var footer = new pageFooter1("#load-pageFooter",{});

            $.when(
                top.state,
                header.state,
                headerFixed.state,
                nav.state,
                banner.state,
                info1.state,
                info2.state,
                sideFixed.state,
                footer.state
            ).done(function(){
                common.logOutput("visit-index", "启用页面事件...");
                enableEvents(header, headerFixed);
            });
        }
    });



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header, headerFixed){

        /** @description:
         *     1、设置历史状态（数据）
         *     2、得到历史状态（数据）
         *     3、更新 url值（数据）
         *     4、页面加载,设定历史状态、更新 url值
         */
        var historyState = {
            config: {
            },
            requestData: {
            }
        };
        function getHistoryState(state){}
        function setHistoryState(state, type){}
        function setHistory(state, type){}


        /** @description:   模拟游览器前进后退的事件
         */
        window.onpopstate = function(e) {
            if( e && e.state && e.state.config && e.state.requestData ){
                getHistoryState(e.state);
                setHistoryState(e.state,"cover");
            }
        };


        /** @description:   模块触发交互事件
         */
        $(header.element).add(headerFixed.element)
            .on("input propertychange", ".input-search", function(){
                var $node = $(this);
                var searchCont = $node.val();
                var $header = header.element;
                var $headerFixed = headerFixed.element;
                var header_config = header.options.renderData.CONFIG;
                var headerFixed_config = headerFixed.options.renderData.CONFIG;
                if(searchCont!==""){
                    $($header,$headerFixed).find(".placeholderIcon").css("display","none");
                }
                else{
                    $($header,$headerFixed).find(".placeholderIcon").css("display","block");
                }
                header_config.attr("searchCont", searchCont);
                headerFixed_config.attr("searchCont", searchCont);
            });

        $(header.element).add(headerFixed.element)
            .on("click", ".searchType>[searchType]", function(){
                var $node = $(this);
                var searchType = $node.attr("searchType");
                var header_config = header.options.renderData.CONFIG;
                var headerFixed_config = headerFixed.options.renderData.CONFIG;
                $.each(header_config.searchList, function(i, map){
                    searchType == map.attr("type")?
                        map.attr("active", "active"): map.attr("active", null);
                });
                $.each(headerFixed_config.searchList, function(i, map){
                    searchType == map.attr("type")?
                        map.attr("active", "active"): map.attr("active", null);
                })
            });

        $(header.element).add(headerFixed.element)
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
            })

    }

});