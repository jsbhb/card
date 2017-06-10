/**
 * Created by linpengteng on 2017/5/23.
 */



define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "comm.index.1",
    "comm.searchCompany.1",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.searchShop.1",
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
    controlSearchShop1,
    controlPageFooter1){

    //读取url参数值
    function GetUrlString(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = decodeURI(window.location.search).substr(1).match(reg);
        if(r!=null){
            return r[2];
        }else{
            return null;
        }
    }


    var SEARCH_CONTENT = GetUrlString("commodityName");

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
        config:{
            directRender: true,
            renderData: { CITY_POPULARIZE: CITY_POPULARIZE }
        }
    });

    //生成页面header部分
    new controlPageHeader1(".load-pageHeader",{
        config:{
            directRender: true,
            renderData: {
                renderCSS: {
                    SEARCH_TYPE:2,
                    SEARCH_COMPANY: "商品",
                    SEARCH_CONTENT: SEARCH_CONTENT
                },

            }
        }
    });

    //生成页面nav部分
    new controlPageNav1(".load-pageNav",{
        config:{
            directRender: false,
            renderData: {
                renderCSS: {
                    searchShop: "active",
                    border: "border"
                }
            }
        }
    });

    //生成页面searchShop部分
    new controlSearchShop1(".load-searchShop1",{
        config:{
            directRender: false,
            renderData: { },
            urlData: {
                "commodityName": SEARCH_CONTENT,
                "numPerPage": 20,
                "currentPage": 1,
            }
        },
    });

    //生成页面footer部分
    new controlPageFooter1(".load-pageFooter",{
        config:{
            directRender: true,
            renderData: { }
        }
    });


})