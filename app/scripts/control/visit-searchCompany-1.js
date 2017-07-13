/**
 * Created by linpengteng on 2017/5/23.
 */



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
    "control.page.headerFixed.1",
    "control.page.nav.1",
    "control.page.searchCompany.1",
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
    pageHeaderFixed1,
    pageNav1,
    controlSearchCompany1,
    pageFooter1){


    /** @description:   新建页面元素（确认页面所需模块）
     */
    common.logOutput("visit-searchCompany", "新建页面元素");
    var E_HTML =            "body";
    var E_TOP =             $("<div id='load-pageTop'></div>");
    var E_HEADER =          $("<div id='load-pageHeader'></div>");
    var E_HEADER_FIXED =    $("<div id='load-pageHeaderFixed'></div>");
    var E_NAV =             $("<div id='load-pageNav'></div>");
    var E_BODY =            $("<div id='load-pageBody' style='min-height:480px'></div>");
    var E_FOOTER =          $("<div id='load-pageFooter'></div>");
    var E_SEARCH_COMPANY =  $("<div id='load-searchCompany'></div>");

    $(E_HTML)
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_HEADER_FIXED)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);
    $(E_BODY)
        .append(E_SEARCH_COMPANY);



    /** @description:
     *       --> 获取页面数据
     *       --> 加载页面模块
     *       --> 启用页面事件
     */
    common.logOutput("visit-searchCompany", "获取页面数据");
    var LOCAL_CITY =          common.getRegion().LOCAL_CITY;
    var memberName =          common.getUrlParam("memberName");
    var categoryEntryId =     common.getUrlParam("categoryEntryId");
    var categoryEntryName =   common.getUrlParam("categoryEntryName");
    var currentPage =         common.getUrlParam("currentPage");
    var searchCont =          "";
    var querySearchCompany =  {};
    if(memberName){
        searchCont = memberName;
        querySearchCompany["currentPage"] = currentPage||1;
        querySearchCompany["memberName"] = memberName;
    }
    if(categoryEntryId){
        searchCont = categoryEntryName;
        querySearchCompany["currentPage"] = currentPage||1;
        querySearchCompany["entryList[0].categoryEntry"] = categoryEntryId;
    }

    common.logOutput("visit-searchCompany", "加载页面模块...");

    var top = new pageTop1("#load-pageTop",{
        responseData: {
            LOCAL_CITY: LOCAL_CITY
        }
    });
    var header = new pageHeader1("#load-pageHeader",{
        config: {
            searchCont: searchCont,
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
    var searchCompany = new controlSearchCompany1("#load-searchCompany",{
        config: {
            searchCont: searchCont
        },
        requestData: {
            querySearchCompany: querySearchCompany
        }
    });
    var footer = new pageFooter1("#load-pageFooter",{});

    $.when(
        top.isFinish,
        header.isFinish,
        nav.isFinish,
        searchCompany.isFinish,
        footer.isFinish
    ).done(function(){
        common.logOutput("visit-searchCompany", "启用页面事件...");
        enableEvents(header, searchCompany);
    });



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header, searchCompany){

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
                    searchCompany: searchCompany.options.config
                },
                requestData: {
                    header: header.options.requestData,
                    searchCompany: searchCompany.options.requestData
                }
            }
        }
        function getHistoryState(state){
            header.options.config = state.config.header || {};
            header.options.requestData = state.requestData.header|| {};
            searchCompany.options.config = state.config.searchCompany || {};
            searchCompany.options.requestData = state.requestData.searchCompany|| {};
        }
        function setHistory(state, type){
            var memberName = searchCompany.options.requestData.querySearchCompany.memberName;
            var pagination = searchCompany.options.renderData.RESPONSE.pagination;
            var currentPage = pagination && pagination.currentPage;
            common.setUrlParam(
                { "memberName":  memberName, "currentPage":  currentPage },
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
                searchCompany.toRender("querySearchCompany");
                $.when(searchCompany.isFinish).done(function(){
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
                if(type == "1"){
                    if(location.pathname!= "/app/webpage/searchCompany.html"){
                        location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                    }
                    else{
                        searchCompany.config = {
                            industryName: null,
                            dictName: null,
                            entryName: null,
                            filterDefault: { active:true, down: true },
                            filterReputation: { active:null, down: true },
                            filterCalendar: { active:null, down: true },
                            highQuality: false,
                            sincerity: false,
                            returnGoods: false,
                            guarantee: false
                        };
                        searchCompany.options.config = {
                            searchCont: header.options.renderData.CONFIG.searchCont
                        };
                        searchCompany.options.requestData.querySearchCompany = {
                            currentPage: 1,
                            numPerPage: 10,
                            memberName: header.options.renderData.CONFIG.searchCont
                        };
                        searchCompany.toRender("querySearchCompany");
                        $.when(searchCompany.isFinish).done(function(){
                            setHistoryState();
                            setHistory(historyState, "add");
                        })
                    }
                }else if(type == "2"){
                    if(location.pathname!= "/app/webpage/searchShop.html"){
                        location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
                    }
                }
            });

        $(searchCompany.element)
            .on("click",
                "[industryMap]," +
                "[dictMap]," +
                "[entryMap]," +
                ".resultCategory .deleteIcon," +
                ".filter>.btn-group>a," +
                ".inputGroup>label," +
                "li.pagination_page>a.pagination_btn", function(){
                    can.when(searchCompany.isFinish)
                        .done(function(){
                            setHistoryState();
                            setHistory(historyState, "add");
                        })
            });

    }

});