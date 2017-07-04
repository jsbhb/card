/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "bower.can",
    "bower.dotdotdot.min",
    "widget.common",
    "widget.scrollMonitor",
    "config.helper",
    "comm.collect",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.headerFixed.1",
    "control.page.nav.1",
    "control.page.banner.1",
    "control.page.info.1",
    "control.page.info.2",
    "control.page.sideFixed.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, can, dot, common, scrollMonitor, helper, comm,
    controlPageTop1,
    controlPageHeader1,
    controlPageHeaderFixed1,
    controlPageNav1,
    controlPageBanner1,
    controlPageInfo1,
    controlPageInfo2,
    controlPageSideFixed1,
    controlPageFooter1){


    /** @description:  新建页面元素（确认需要哪些模块）
     */
    var C_SHORT =         "short";
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

    $("body")
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



    /** @description:   1、获取数据(无需访问后台), 设定模块的初始数据
     *                  2、如需访问后台数据, 异步查询并获取, 此后模块重新渲染数据
     */
    var searchCont =         "";
    var topResponseData =    { localCity: common.getRegion().localCity };
    var bannerResponseData = {};
    var infoResponseData1 =  { "MEMBER_PRODUCT_POPULARIZE":{}, "MEMBER_POPULARIZE": {} };
    var infoResponseData2 =  {};
    var infoResponseData3 =  { "MEMBER_PRODUCT_POPULARIZE":{}, "MEMBER_POPULARIZE": {} };
    var infoResponseData4 =  {};

    can.when(comm.queryIndex())
        .done(function(responseData) {
            if (responseData && responseData.success) {
                var data = responseData.obj;
                bannerResponseData = data.INDEX_BANNER;
                infoResponseData1["MEMBER_PRODUCT_POPULARIZE"] = data.MEMBER_PRODUCT_POPULARIZE_1;
                infoResponseData1["MEMBER_POPULARIZE"] = data.MEMBER_POPULARIZE_1;
                infoResponseData2 = data.PRODUCT_POPULARIZE_1;
                infoResponseData3["MEMBER_PRODUCT_POPULARIZE"] = data.MEMBER_PRODUCT_POPULARIZE_1;
                infoResponseData3["MEMBER_POPULARIZE"] = data.MEMBER_POPULARIZE_1;
                infoResponseData4 = data.PRODUCT_POPULARIZE_1;
            }
            if(banner){ banner.setRenderData(bannerResponseData) }
            if(info1){ info1.setRenderData(infoResponseData1) }
            if(info2){ info2.setRenderData(infoResponseData2) }
            if(info3){ info3.setRenderData(infoResponseData3) }
            if(info4){ info4.setRenderData(infoResponseData4) }
        });



    /** @description:  加载页面模块（此时渲染数据为：初始数据）
     */
    var top = new controlPageTop1("#load-pageTop",{
        responseData: topResponseData
    });
    var header = new controlPageHeader1("#load-pageHeader",{
        config: {
            searchCont: searchCont,
            searchList:[
                { type: 1, name: "企业", active: "active" },
                { type: 2, name: "商品", active: null }
            ]
        }
    });
    var headerFixed = new controlPageHeaderFixed1("#load-pageHeaderFixed",{
        config: {
            searchCont: searchCont,
            searchList:[
                { type: 1, name: "企业", active: "active" },
                { type: 2, name: "商品", active: null }
            ]
        }
    });
    var nav = new controlPageNav1("#load-pageNav",{
        config:{ showed: "showed" }
    });
    var banner = new controlPageBanner1("#load-pageBanner",{
        config: {},
        responseData: bannerResponseData,
    });
    var info1 = new controlPageInfo1("#load-pageInfo1",{
        config: {},
        responseData: infoResponseData1
    });
    var info2 = new controlPageInfo2("#load-pageInfo2",{
        config: {},
        responseData: infoResponseData2
    });
    var info3 = new controlPageInfo1("#load-pageInfo3",{
        config: {},
        responseData: infoResponseData3
    });
    var info4 = new controlPageInfo2("#load-pageInfo4",{
        config: {},
        responseData: infoResponseData4
    });
    var sideFixed = new controlPageSideFixed1("#load-pageSideFixed",{
        config: {
            list: [
                {"name":"货源市场", "id":"load-pageNav", "toTop": true},
                {"name":"安防消防", "id":"load-pageInfo1"},
                {"name":"电子行业", "id":"load-pageInfo2"},
                {"name":"酒店家具", "id":"load-pageInfo3"},
                {"name":"五金建材", "id":"load-pageInfo4"},
            ]
        },
        position_offset: 60
    });
    var footer = new controlPageFooter1("#load-pageFooter");



    /** @description:  为模块绑定事件（模块之间的交互、页面的跳转等）
     */
    $(headerFixed.element).add(header.element)
        .on("input propertychange", ".input-search", function(){
            var $node = $(this);
            var searchCont = $node.val();
            var $header = header.element;
            var $headerFixed = headerFixed.element;
            var header_config = header.options.renderData.CONFIG;
            var headerFixed_config = headerFixed.options.renderData.CONFIG;

            if(searchCont!=""){
                $($header,$headerFixed).find(".placeholderIcon").css("display","none");
            }else{
                $($header,$headerFixed).find(".placeholderIcon").css("display","block");
            }
            header_config.attr("searchCont", searchCont);
            headerFixed_config.attr("searchCont", searchCont);
        });
    $(headerFixed.element).add(header.element)
        .on("click", ".searchType>[searchType]", function(){
            var $node = $(this);
            var searchType = $node.attr("searchType");
            var header_config = header.options.renderData.CONFIG;
            var headerFixed_config = headerFixed.options.renderData.CONFIG;
            $.each(header_config.searchList, function(i, map){
                if(searchType == map.attr("type")){
                    map.attr("active", "active")
                }else{
                    map.attr("active", null)
                }
            })
            $.each(headerFixed_config.searchList, function(i, map){
                if(searchType == map.attr("type")){
                    map.attr("active", "active");
                }else{
                    map.attr("active", null);
                }
            })
        });

});