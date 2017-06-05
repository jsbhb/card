/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "comm.index.1",
    "comm.search.1",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.search.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont",
], function(
    $, _, bootstrap,
    commIndex1,
    commSearch1,
    controlPageTop1,
    controlPageHeader1,
    controlPageNav1,
    controlSearch1,
    controlPageFooter1){

    can.when(commIndex1.queryAll())

        .done(function(responseData){

            var CITY_POPULARIZE = responseData && responseData.obj &&
                                  responseData.obj.CITY_POPULARIZE || {};

            var C_SHORT =         "SHORT";
            var E_PAGE_TOP =      $("<div class='load-pageTop'></div>");
            var E_PAGE_HEADER =   $("<div class='load-pageHeader'></div>");
            var E_PAGE_NAV =      $("<div class='load-pageNav'></div>");
            var E_PAGE_BODY =     $("<div class='load-pageBody' style='min-height:396px'></div>");
            var E_PAGE_FOOTER =   $("<div class='load-pageFooter'></div>");

            var E_PAGE_SEARCH1 =   $("<div class='load-pageSearch1'></div>");

            $("body")
                .addClass(C_SHORT)
                .append(E_PAGE_TOP)
                .append(E_PAGE_HEADER)
                .append(E_PAGE_NAV)
                .append(E_PAGE_BODY)
                .append(E_PAGE_FOOTER);

            $("body").find($(E_PAGE_BODY))
                .append(E_PAGE_SEARCH1);


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
                        renderCSS: { border: "border" }
                    }
                }
            });

            //生成页面search部分
            new controlSearch1(".load-pageSearch1",{
                config:{
                    directRender: false,
                    renderData: { }
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