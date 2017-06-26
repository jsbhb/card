/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "config.helper",
    "comm.index",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.banner.1",
    "control.page.info.1",
    "control.page.info.2",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap, helper,
    comm_index,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlPageBanner1,
    controlPageInfo1,
    controlPageInfo2,
    controlPageFooter1){

    can.when(comm_index.queryAll())

        .done(function(responseData){

            var CITY_POPULARIZE = { localCity: "浙江宁波" };

            var INDEX_BANNER = responseData && responseData.obj &&
                               responseData.obj.INDEX_BANNER || {};

            var MEMBER_PRODUCT_POPULARIZE_1 = responseData && responseData.obj &&
                                              responseData.obj.MEMBER_PRODUCT_POPULARIZE_1 || {};

            var MEMBER_POPULARIZE_1 = responseData && responseData.obj &&
                                      responseData.obj.MEMBER_POPULARIZE_1 || {};

            var PRODUCT_POPULARIZE_1 = responseData && responseData.obj &&
                                       responseData.obj.PRODUCT_POPULARIZE_1 || {};

            var C_SHORT =         "SHORT";
            var E_PAGE_TOP =      $("<div class='load-pageTop'></div>");
            var E_PAGE_HEADER =   $("<div class='load-pageHeader'></div>");
            var E_PAGE_NAV =      $("<div class='load-pageNav'></div>");
            var E_PAGE_BANNER =   $("<div class='load-pageBanner'></div>");
            var E_PAGE_BODY =     $("<div class='load-pageBody' style='min-height:396px'></div>");
            var E_PAGE_FOOTER =   $("<div class='load-pageFooter'></div>");

            var E_PAGE_INFO1_1 =   $("<div class='load-pageInfo1-1'></div>");
            var E_PAGE_INFO2_1 =   $("<div class='load-pageInfo2-1'></div>");
            var E_PAGE_INFO1_2 =   $("<div class='load-pageInfo1-2'></div>");
            var E_PAGE_INFO2_2 =   $("<div class='load-pageInfo2-2'></div>");

            $("body")
                .addClass(C_SHORT)
                .append(E_PAGE_TOP)
                .append(E_PAGE_HEADER)
                .append(E_PAGE_NAV)
                .append(E_PAGE_BANNER)
                .append(E_PAGE_BODY)
                .append(E_PAGE_FOOTER);

            $("body").find($(E_PAGE_BODY))
                .append(E_PAGE_INFO1_1)
                .append(E_PAGE_INFO2_1)
                .append(E_PAGE_INFO1_2)
                .append(E_PAGE_INFO2_2);


            //生成页面top部分
            new controlPageTop1(".load-pageTop",{
                config: {},
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
                    INDEX: "active",
                    CONTTYPE: "showed"
                }
            });

            //生成页面banner部分
            new controlPageBanner1(".load-pageBanner",{
                config: {},
                responseData: INDEX_BANNER,
            });

            //生成页面info-content部分
            new controlPageInfo1(".load-pageInfo1-1",{
                config: {},
                responseData: {
                    MEMBER_PRODUCT_POPULARIZE_1: MEMBER_PRODUCT_POPULARIZE_1,
                    MEMBER_POPULARIZE_1: MEMBER_POPULARIZE_1
                }
            });
            new controlPageInfo2(".load-pageInfo2-1",{
                config: {},
                responseData: PRODUCT_POPULARIZE_1
            });
            new controlPageInfo1(".load-pageInfo1-2",{
                config: {},
                responseData: {
                    MEMBER_PRODUCT_POPULARIZE_1: MEMBER_PRODUCT_POPULARIZE_1,
                    MEMBER_POPULARIZE_1: MEMBER_POPULARIZE_1
                }
            });
            new controlPageInfo2(".load-pageInfo2-2",{
                config: {},
                responseData: PRODUCT_POPULARIZE_1
            });


            //生成页面footer部分
            new controlPageFooter1(".load-pageFooter");

        })

})