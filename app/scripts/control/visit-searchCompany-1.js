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
    "control.page.searchCompany.1",
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
    controlSearchCompany1,
    controlPageFooter1){


    /** @description:  新建元素
     */
    var E_TOP =             $("<div id='load-pageTop'></div>");
    var E_HEADER =          $("<div id='load-pageHeader'></div>");
    var E_HEADER_FIXED =    $("<div id='load-pageHeaderFixed'></div>");
    var E_NAV =             $("<div id='load-pageNav'></div>");
    var E_BODY =            $("<div id='load-pageBody' style='min-height:480px'></div>");
    var E_FOOTER =          $("<div id='load-pageFooter'></div>");
    var E_SEARCH_COMPANY =  $("<div id='load-searchCompany'></div>");

    $("body")
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_HEADER_FIXED)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);

    $(E_BODY)
        .append(E_SEARCH_COMPANY);



    /** @description:  获取数据
     */
    var searchCont =                "";
    var memberName =                common.getUrlParam("memberName");
    var categoryEntryId =           common.getUrlParam("categoryEntryId");
    var categoryEntryName =         common.getUrlParam("categoryEntryName");
    var currentPage =               common.getUrlParam("currentPage");
    var topResponseData =           common.getRegion().localCity;
    var searchCompanyRequestData =  { querySearchCompany:{} }

    if(memberName){
        searchCont = memberName;
        searchCompanyRequestData.querySearchCompany.currentPage = currentPage||1;
        searchCompanyRequestData.querySearchCompany.memberName = memberName;
    }
    if(categoryEntryId){
        searchCont = categoryEntryName;
        searchCompanyRequestData.querySearchCompany.currentPage = currentPage||1;
        searchCompanyRequestData.querySearchCompany.entryList[0].categoryEntry = categoryEntryId;
    }



    /** @description:  加载模块
     */
    var top = new controlPageTop1("#load-pageTop",{
        config: {},
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
    var nav = new controlPageNav1("#load-pageNav",{
        config:{ border: "border" }
    });
    var searchCompany = new controlSearchCompany1("#load-searchCompany",{
        config: { searchCont: searchCont },
        requestData: searchCompanyRequestData
    });
    var footer = new controlPageFooter1("#load-pageFooter");




    /** @description:  绑定事件（模块交互、页面交互）
     */

});