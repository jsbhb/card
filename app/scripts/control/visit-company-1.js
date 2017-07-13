/**
 * Created by linpengteng on 2017/5/23.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.bootstrap.min",
    "bower.can",
    "bower.dotdotdot.min",
    "widget.common",
    "config.system",
    "model.comm",
    "control.page.top.1",
    "control.page.header.1",
    "control.page.nav.1",
    "control.page.company.1",
    "control.page.footer.1",
    "bower.css!css.font.awesome.min",
    "bower.css!css.bootstrap.min",
    "bower.css!css.uFont"
], function(
    $, _, bootstrap, can, dot,
    common,
    system,
    comm,
    pageTop1,
    pageHeader1,
    pageNav1,
    pageCompany1,
    pageFooter1){


    /** @description:   新建页面元素（确认页面所需模块）
     */
    var C_SHORT =     "short";
    var E_TOP =       $("<div id='load-pageTop'></div>");
    var E_HEADER =    $("<div id='load-pageHeader'></div>");
    var E_NAV =       $("<div id='load-pageNav'></div>");
    var E_BODY =      $("<div id='load-pageBody' style='min-height:450px'></div>");
    var E_FOOTER =    $("<div id='load-pageFooter'></div>");
    var E_COMPANY =   $("<div id='load-pageCompany'></div>");

    $("body")
        .addClass(C_SHORT)
        .append(E_TOP)
        .append(E_HEADER)
        .append(E_NAV)
        .append(E_BODY)
        .append(E_FOOTER);
    $(E_BODY)
        .append(E_COMPANY);



    /** @description:   定义页面层事件（模块交互、页面跳转等）
     */
    function enableEvents(header){

        $(header.element)
            .on("input propertychange", ".input-search", function(){
                var $node = $(this);
                var searchCont = $node.val();
                var $header = header.element;
                var header_config = header.options.renderData.CONFIG;
                if(searchCont!=""){
                    $($header).find(".placeholderIcon").css("display","none");
                }else{
                    $($header).find(".placeholderIcon").css("display","block");
                }
                header_config.attr("searchCont", searchCont);
            });

        $(header.element)
            .on("click", ".btn-search", function(){
                var $node = $(this);
                var type = $node.parent().parent().parent().find(".active[searchType]").attr("searchType");
                var cont = $node.parent().parent().parent().find(".input-search").val().trim();
                if(type == "1"){
                    if(location.pathname!= "/app/webpage/searchCompany.html"){
                        location.href = encodeURI("/app/webpage/searchCompany.html?memberName="+cont);
                    }
                }else if(type == "2"){
                    if(location.pathname!= "/app/webpage/searchShop.html"){
                        location.href = encodeURI("/app/webpage/searchShop.html?commodityName="+cont);
                    }
                }
            });
    }




    /** @description:   获取模块所需数据 --> 加载相应的页面模块 --> 为页面模块绑定事件
     */

    // 1、获取模块所需数据
    var memberId = common.getUrlParam("memberId");


    // 2、加载相应的页面模块
    var top = new pageTop1("#load-pageTop",{
        responseData: {
            localCity: common.getRegion().localCity
        }
    });
    var header = new pageHeader1("#load-pageHeader",{
        config: {
            searchCont: "",
            SEARCH_List:[
                { type: 1, name: "企业", active: "active" },
                { type: 2, name: "商品", active: null }
            ]
        }
    });
    var nav = new pageNav1("#load-pageNav",{
        config:{
            border: "border"
        }
    });
    var company = new pageCompany1("#load-pageCompany",{
        config: {
            searchCont: ""
        },
        requestData: {
            queryCompany:{ id: memberId },
            queryShop:{ memberId: memberId }
        }
    });
    var footer = new pageFooter1("#load-pageFooter");


    // 3、为页面模块绑定事件（模块之间的交互、页面的跳转等）

});