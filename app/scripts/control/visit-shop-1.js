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
    "control.page.shop.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, can, dot, common, scrollMonitor, helper, comm,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlShop1,
    controlPageFooter1){


    /** @description:  新建页面元素
     */
    var C_SHORT =    "SHORT";
    var E_TOP =      $("<div id='load-pageTop'></div>");
    var E_HEADER =   $("<div id='load-pageHeader'></div>");
    var E_NAV =      $("<div id='load-pageNav'></div>");
    var E_BODY =     $("<div id='load-pageBody' style='min-height:450px'></div>");
    var E_FOOTER =   $("<div id='load-pageFooter'></div>");
    var E_SHOP =     $("<div id='load-pageShop'></div>");

    $("body")
        .addClass(C_SHORT)
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);

    $(E_BODY)
        .append(E_SHOP);



    /** @description:  设定数据初始值 --> 获取数据, 各模块重新渲染数据（异步）
     */
    var searchCont =       "";
    var memberId =         common.getUrlParam("memberId");
    var commodityId =      common.getUrlParam("commodityId");
    var topResponseData =  { localCity: common.getRegion().localCity };
    var shopRequestData =  { queryShop:{} };

    if(memberId){
        shopRequestData.queryShop.memberId = memberId;
    }
    if(commodityId){
        shopRequestData.queryShop.commodityId = commodityId;
    }



    /** @description:  加载页面模块（此时渲染数据为：初始值）
     */
    var top = new controlPageTop1("#load-pageTop",{
        responseData: topResponseData
    });
    var header = new controlPageHeader1("#load-pageHeader",{
        config: {
            searchCont: searchCont,
            SEARCH_List:[
                { type: 1, name: "企业", active: "active" },
                { type: 2, name: "商品", active: null }
            ]
        }
    });
    var nav = new controlPageNav1("#load-pageNav",{
        config:{ border: "border" }
    });
    var shop1 = new controlShop1("#load-pageShop",{
        config: { searchCont: searchCont },
        requestData: shopRequestData
    });
    var footer = new controlPageFooter1("#load-pageFooter");



    /** @description:  为模块绑定事件（模块间的交互、页面的跳转等）
     */


});