/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "comm.index.1",
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
    $, _, bootstrap,
    commIndex1,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlPageBanner1,
    controlPageInfo1,
    controlPageInfo2,
    controlPageFooter1){

    can.when(commIndex1.queryAll())

        .done(function(responseData){

            var CITY_POPULARIZE = responseData && responseData.obj &&
                                  responseData.obj.CITY_POPULARIZE || {};

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

            var E_PAGE_INFOA1 =   $("<div class='load-pageInfoA1'></div>");
            var E_PAGE_INFOB1 =   $("<div class='load-pageInfoB1'></div>");
            var E_PAGE_INFOA2 =   $("<div class='load-pageInfoA2'></div>");
            var E_PAGE_INFOB2 =   $("<div class='load-pageInfoB1'></div>");

            $("body")
                .addClass(C_SHORT)
                .append(E_PAGE_TOP)
                .append(E_PAGE_HEADER)
                .append(E_PAGE_NAV)
                .append(E_PAGE_BANNER)
                .append(E_PAGE_BODY)
                .append(E_PAGE_FOOTER);

            $("body").find($(E_PAGE_BODY))
                .append(E_PAGE_INFOA1)
                .append(E_PAGE_INFOB1)
                .append(E_PAGE_INFOA2)
                .append(E_PAGE_INFOB2);


            //生成页面top部分
            new controlPageTop1(".load-pageTop",{
                config:{
                    directRender: true,
                    renderData: { CITY_POPULARIZE: CITY_POPULARIZE }
                }
            });

            //生成页面header部分
            new controlPageHeader1(".load-pageHeader",{
                config:{
                    directRender: true,
                    renderData: {}
                }
            });

            //生成页面nav部分
            new controlPageNav1(".load-pageNav",{
                config:{
                    directRender: false,
                    renderData: {
                        renderCSS: { contType: "showed" }
                    }
                }
            });

            //生成页面banner部分
            new controlPageBanner1(".load-pageBanner",{
                config:{
                    directRender: true,
                    renderData: { INDEX_BANNER: INDEX_BANNER }
                }
            });

            //生成页面info-content部分
            new controlPageInfo1(".load-pageInfoA1",{
                config:{
                    directRender: true,
                    renderData: {
                        MEMBER_PRODUCT_POPULARIZE_1: MEMBER_PRODUCT_POPULARIZE_1,
                        MEMBER_POPULARIZE_1: MEMBER_POPULARIZE_1
                    }
                }
            });
            new controlPageInfo2(".load-pageInfoB1",{
                config:{
                    directRender: true,
                    renderData: {
                        PRODUCT_POPULARIZE_1: PRODUCT_POPULARIZE_1
                    }
                }
            });
            new controlPageInfo1(".load-pageInfoA2",{
                config:{
                    directRender: true,
                    renderData: {
                        MEMBER_PRODUCT_POPULARIZE_1: MEMBER_PRODUCT_POPULARIZE_1,
                        MEMBER_POPULARIZE_1: MEMBER_POPULARIZE_1
                    }
                }
            });
            new controlPageInfo2(".load-pageInfoB2",{
                config:{
                    directRender: true,
                    renderData: {
                        PRODUCT_POPULARIZE_1: PRODUCT_POPULARIZE_1
                    }
                }
            });


            //生成页面footer部分
            new controlPageFooter1(".load-pageFooter",{
                config:{
                    directRender: true,
                    renderData: { }
                }
            });

        })

})