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
    "control.page.nav.1",
    "control.page.searchShop.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, can, dot, common, scrollMonitor, helper, comm,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlSearchShop1,
    controlPageFooter1){


    /** @description:  新建页面元素（确认需要哪些模块）
     */
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



    /** @description:   1、获取数据(无需访问后台), 设定模块的初始数据
     *                  2、如需访问后台数据, 异步查询并获取, 此后模块重新渲染数据
     */
    var searchCont =             "";
    var commodityName =          common.getUrlParam("commodityName");
    var currentPage =            common.getUrlParam("currentPage");
    var topResponseData =        { localCity: common.getRegion().localCity };
    var searchShopRequestData =  { querySearchShop: {} };

    if(commodityName){
        searchCont = commodityName;
        searchShopRequestData.querySearchShop["currentPage"] = currentPage||1;
        searchShopRequestData.querySearchShop["commodityName"] = commodityName;
    }



    /** @description:  加载页面模块（此时渲染数据为：初始数据）
     */
    var top = new controlPageTop1("#load-pageTop",{
        responseData: topResponseData
    });
    var header = new controlPageHeader1("#load-pageHeader",{
        config: {
            searchCont: searchCont,
            searchList:[
                { type: 1, name: "企业", active: null },
                { type: 2, name: "商品", active: "active" }
            ]
        }
    });
    var nav = new controlPageNav1("#load-pageNav",{
        config:{ border: "border" }
    });
    var searchShop = new controlSearchShop1("#load-searchShop",{
        config: { searchCont: searchCont },
        requestData: searchShopRequestData
    });
    var footer = new controlPageFooter1("#load-pageFooter");



    /** @description:  为模块绑定事件（模块之间的交互、页面的跳转等）
     */
    $(header.element)
        .on("click", ".btn-search", function(){
            var $node = $(this);
            var type = $node.parent().parent().parent().find(".active[searchType]").attr("searchType");
            var cont = $node.parent().parent().parent().find(".input-search").val().trim();
            if(type == "1"){
                if(location.pathname!= "/app/webpage/searchCompany.html"){
                    location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                }
            }else if(type == "2"){
                if(location.pathname!= "/app/webpage/searchShop.html"){
                    location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
                }else{
                    searchShop.toRender(null, searchShop.requestType);
                }
            }
        });



});