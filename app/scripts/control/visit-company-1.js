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
    "control.page.company.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, util, helper,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlCompany1,
    controlPageFooter1){

    var CITY_POPULARIZE = { localCity: "浙江宁波" };
    var memberid = util.getUrlParam("memberid");

    var C_SHORT =         "SHORT";
    var E_PAGE_TOP =      $("<div class='load-pageTop'></div>");
    var E_PAGE_HEADER =   $("<div class='load-pageHeader'></div>");
    var E_PAGE_NAV =      $("<div class='load-pageNav'></div>");
    var E_PAGE_BODY =     $("<div class='load-pageBody' style='min-height:375px'></div>");
    var E_PAGE_FOOTER =   $("<div class='load-pageFooter'></div>");

    var E_PAGE_COMPANY1 =   $("<div class='load-pageCompany1'></div>");

    $("body")
        .addClass(C_SHORT)
        .append(E_PAGE_TOP)
        .append(E_PAGE_HEADER)
        .append(E_PAGE_NAV)
        .append(E_PAGE_BODY)
        .append(E_PAGE_FOOTER);

    $("body")
        .find($(E_PAGE_BODY))
        .append(E_PAGE_COMPANY1);


    //生成页面top部分
    new controlPageTop1(".load-pageTop",{
        responseData: CITY_POPULARIZE,
    });


    //生成页面header部分
    new controlPageHeader1(".load-pageHeader",{
        config: {
            SEARCH_TYPE: 1,
            SEARCH_COMPANY: "企业"
        }
    });


    //生成页面nav部分
    new controlPageNav1(".load-pageNav",{
        config:{
            SEARCHCOMPANY: "active",
            BORDER: "border"
        }
    });


    //生成页面company部分
    new controlCompany1(".load-pageCompany1",{
        urlData: {
            "memberid": memberid,
        }
    });


    //生成页面footer部分
    new controlPageFooter1(".load-pageFooter");

})