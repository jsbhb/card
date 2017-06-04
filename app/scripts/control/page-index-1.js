/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "comm.page.index.1",
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
    commPageIndex1, controlPageTop1,
    controlPageHeader1, controlPageNav1, controlPageBanner1,
    controlPageInfo1, controlPageInfo2, controlPageFooter1){

    can.when(commPageIndex1.queryAll())

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


            var C_SHORT =           "SHORT";
            var E_PAGETOP =         "<div class='load-pageTop'></div>";
            var E_PAGEHEADER =      "<div class='load-pageHeader'></div>";
            var E_PAGENAV =         "<div class='load-pageNav'></div>";
            var E_PAGEBANNER =      "<div class='load-pageBanner'></div>";
            var E_PAGEINFOA1 =       "<div class='load-pageInfoA1'></div>";
            var E_PAGEINFOB1 =       "<div class='load-pageInfoB1'></div>";
            var E_PAGEINFOA2 =       "<div class='load-pageInfoA2'></div>";
            var E_PAGEINFOB2 =       "<div class='load-pageInfoB1'></div>";
            var E_PAGEFOOTER =      "<div class='load-pageFooter'></div>";

            $("body")
                .addClass(C_SHORT)
                .append(E_PAGETOP)
                .append(E_PAGEHEADER)
                .append(E_PAGENAV)
                .append(E_PAGEBANNER)
                .append(E_PAGEINFOA1)
                .append(E_PAGEINFOB1)
                .append(E_PAGEINFOA2)
                .append(E_PAGEINFOB2)
                .append(E_PAGEFOOTER);

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

            //生成页面info部分
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

            //生成页面info部分
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