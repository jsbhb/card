/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "config.util",
    "config.helper",
    "comm.index",
    "comm.searchShop",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.searchShop.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, util, helper,
    comm_index,
    comm_searchShop,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlSearchShop1,
    controlPageFooter1){

    var SEARCH_CONTENT = util.getUrlParam("commodityName");

    var CITY_POPULARIZE = { localCity: "浙江宁波" };

    var E_PAGE_TOP =      $("<div class='load-pageTop'></div>");
    var E_PAGE_HEADER =   $("<div class='load-pageHeader'></div>");
    var E_PAGE_NAV =      $("<div class='load-pageNav'></div>");
    var E_PAGE_BODY =     $("<div class='load-pageBody' style='min-height:375px'></div>");
    var E_PAGE_FOOTER =   $("<div class='load-pageFooter'></div>");

    var E_PAGE_SEARCHSHOP = $("<div class='load-searchShop1'></div>");

    $("body")
        .append(E_PAGE_TOP)
        .append(E_PAGE_HEADER)
        .append(E_PAGE_NAV)
        .append(E_PAGE_BODY)
        .append(E_PAGE_FOOTER);

    $("body").find($(E_PAGE_BODY))
        .append(E_PAGE_SEARCHSHOP);


    //生成页面top部分
    new controlPageTop1(".load-pageTop",{
        responseData: CITY_POPULARIZE,
    });

    //生成页面header部分
    new controlPageHeader1(".load-pageHeader",{
        config:{
            SEARCH_TYPE:2,
            SEARCH_COMPANY: "商品",
            SEARCH_CONTENT: SEARCH_CONTENT
        }
    });

    //生成页面nav部分
    new controlPageNav1(".load-pageNav",{
        config:{
            SEARCHSHOP: "active",
            BORDER: "border"
        }
    });

    //生成页面searchShop部分
    new controlSearchShop1(".load-searchShop1",{
        config: { searchText: SEARCH_CONTENT },
        urlData: {
            "commoditys": SEARCH_CONTENT,
            "numPerPage": 20,
            "currentPage": 1,
        }
    });

    //生成页面footer部分
    new controlPageFooter1(".load-pageFooter");


})