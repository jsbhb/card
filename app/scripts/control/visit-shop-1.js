/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "config.util",
    "config.helper",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.shop.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, util, helper,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlShop1,
    controlPageFooter1){

    var CITY_POPULARIZE = { localCity: "浙江宁波" };
    var memberid = util.getUrlParam("memberid");
    var commodityid = util.getUrlParam("commodityid");

    var C_SHORT =         "SHORT";
    var E_PAGE_TOP =      $("<div class='load-pageTop'></div>");
    var E_PAGE_HEADER =   $("<div class='load-pageHeader'></div>");
    var E_PAGE_NAV =      $("<div class='load-pageNav'></div>");
    var E_PAGE_BODY =     $("<div class='load-pageBody' style='min-height:375px'></div>");
    var E_PAGE_FOOTER =   $("<div class='load-pageFooter'></div>");

    var E_PAGE_SHOP1 =   $("<div class='load-pageShop1'></div>");

    $("body")
        .addClass(C_SHORT)
        .append(E_PAGE_TOP)
        .append(E_PAGE_HEADER)
        .append(E_PAGE_NAV)
        .append(E_PAGE_BODY)
        .append(E_PAGE_FOOTER);

    $("body").find($(E_PAGE_BODY))
        .append(E_PAGE_SHOP1);


    //生成页面top部分
    new controlPageTop1(".load-pageTop",{
        responseData: CITY_POPULARIZE,
    });


    //生成页面header部分
    new controlPageHeader1(".load-pageHeader",{
        config: {
            SEARCH_TYPE:2,
            SEARCH_COMPANY: "商品",
        }
    });


    //生成页面nav部分
    new controlPageNav1(".load-pageNav",{
        config:{
            SEARCHSHOP: "active",
            BORDER: "border"
        }
    });


    //生成页面shop部分
    new controlShop1(".load-pageShop1",{
        urlData: {
            "memberid": memberid,
            "commodityid": commodityid,
        }
    });


    //生成页面footer部分
    new controlPageFooter1(".load-pageFooter");
})