/**
 * Created by linpengteng on 2017/5/23.
 */



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
    "control.page.searchShop.1",
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
    controlSearchShop1,
    pageFooter1){


    /** @description:   新建页面元素（确认页面所需模块）
     */
    common.logOutput("visit-searchShop", "新建页面元素");
    var E_TOP =          $("<div id='load-pageTop'></div>");
    var E_HEADER =       $("<div id='load-pageHeader'></div>");
    var E_HEADER_FIXED = $("<div id='load-pageHeaderFixed'></div>");
    var E_NAV =          $("<div id='load-pageNav'></div>");
    var E_BODY =         $("<div id='load-pageBody' style='min-height:480px'></div>");
    var E_FOOTER =       $("<div id='load-pageFooter'></div>");
    var E_SEARCH_SHOP =  $("<div id='load-searchShop'></div>");

    $("body")
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_HEADER_FIXED)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);
    $(E_BODY)
        .append(E_SEARCH_SHOP);



    /** @description:
     *       --> 获取页面数据
     *       --> 加载页面模块
     *       --> 启用页面事件
     */
    common.logOutput("visit-searchShop", "获取页面数据");
    var localCity =        common.getRegion().localCity;
    var commodityName =    common.getUrlParam("commodityName");
    var currentPage =      common.getUrlParam("currentPage");
    var searchCont =       "";
    var querySearchShop =  {};
    if(commodityName){
        searchCont = commodityName;
        querySearchShop["commodityName"] = commodityName;
    }
    else{
        querySearchShop["currentPage"] = currentPage>0?currentPage:1;
    }


    common.logOutput("visit-searchShop", "加载页面模块...");

    var top = new pageTop1("#load-pageTop",{
        config: {
            localCity: localCity
        }
    });
    var header = new pageHeader1("#load-pageHeader",{
        config: {
            searchCont: searchCont,
            searchList: [
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
    var searchShop = new controlSearchShop1("#load-searchShop",{
        config: {
            searchCont: searchCont
        },
        requestData: {
            querySearchShop: querySearchShop
        }
    });
    var footer = new pageFooter1("#load-pageFooter",{});


    $.when(
        top.options.state,
        header.options.state,
        nav.options.state,
        searchShop.options.state,
        footer.options.state
    ).done(function(){
        common.logOutput("visit-searchShop", "启用页面事件...");
        enableEvents(header, searchShop);
    });



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header, searchShop){

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
                    searchShop: searchShop.options.config
                },
                requestData: {
                    header: header.options.requestData,
                    searchShop: searchShop.options.requestData
                }
            }
        }
        function getHistoryState(state){
            header.options.config = state.config.header || {};
            header.options.requestData = state.requestData.header|| {};
            header.options.renderData.CONFIG.attr("searchCont", state.config.header.searchCont);
            searchShop.options.config = state.config.searchShop || {};
            searchShop.options.requestData = state.requestData.searchShop|| {};
        }
        function setHistory(state, type){
            var commodityName = searchShop.options.requestData.querySearchShop.commodityName;
            var pagination = searchShop.options.renderData.RESPONSE.pagination;
            var currentPage = pagination && pagination.currentPage || 1;
            if(commodityName){
                common.setUrlParam(
                    { "commodityName": commodityName, "currentPage": currentPage }, type, state
                )
            }
            else{
                common.delUrlParam(["memberName"], type, state);
                common.setUrlParam({ "currentPage": currentPage }, "cover", state)
            }
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
                searchShop.toRender("querySearchShop/searchShop");
                $.when(searchShop.state).done(function(){
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
                if(searchCont!=""){
                    $($header).find(".placeholderIcon").css("display","none");
                }else{
                    $($header).find(".placeholderIcon").css("display","block");
                }
                header.options.config.searchCont = searchCont;
                header_config.attr("searchCont", searchCont);
            });

        $(header.element)
            .on("click", ".btn-search", function(){
                var $node = $(this);
                var type = $node.parent().parent().parent().find(".active[searchType]").attr("searchType");
                var cont = $node.parent().parent().parent().find(".input-search").val().trim();
                if(type == 1){
                    if(cont){
                        location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                    }
                    else{
                        location.href = encodeURI("/app/webpage/searchCompany.html");
                    }
                }else if(type == 2){
                    searchShop.options.config = {
                        brand: null,
                        commodityCategory2: null,
                        commodityCategory3: null,
                        color: null,
                        size: null,
                        priceMin: null,
                        priceMax: null,
                        priceRegion: null,
                        filterDefault: { active:true, down: true },
                        filterHot: { active:null, down: true },
                        filterPrice:{ active:null, down: true }
                    };
                    if(header.options.renderData.CONFIG.searchCont){
                        searchShop.options.requestData.querySearchShop = {
                            currentPage: 1,
                            numPerPage: 10,
                            commodityName: header.options.renderData.CONFIG.searchCont
                        };
                    }
                    else{
                        searchShop.options.requestData.querySearchShop = {
                            currentPage: 1,
                            numPerPage: 10
                        };
                    }
                    searchShop.toRender("querySearchShop/searchShop");
                    can.when(searchShop.state)
                        .done(function(){
                            setHistoryState();
                            setHistory(historyState, "add");
                        })
                }
            });

        $(searchShop.element)
            .on("click",
                "[brand]," +
                "[commodityCategory2]," +
                "[commodityCategory3]," +
                "[color]," +
                "[size]," +
                ".priceRegion .priceRegionBtn," +
                ".resultCategory>a .deleteIcon," +
                ".filter>.btn-group>a," +
                ".inputGroup>label," +
                "li.pagination_page>a.pagination_btn", function(){
                    can.when(searchShop.state)
                        .done(function(){
                            setHistoryState();
                            setHistory(historyState, "add");
                        })
                });

    }

});