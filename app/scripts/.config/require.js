/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    //根目录
    baseUrl: '/',


    //依赖关系
    shim: {
        'bower.jquery':              { deps: [],                            exports: '$' },
        "bower.bootstrap.min":       { deps: ['bower.jquery'],              exports: 'bootstrap' },
        "bower.dotdotdot.min":       { deps: ['bower.jquery'],              exports: 'dot' },
        'bower.can':                 { deps: ["bower.jquery"],              exports: 'can' },
        'bower.fixture':             { deps: ["bower.can"],                 exports: 'fixture' },
        'bower.text':                { deps: [],                            exports: 'text' }
    },


    //模块路径
    paths: {

        /** CSS --样式表
         */
        "css.font.awesome.min":        "bower_components/font-awesome/css/font-awesome.min",
        "css.bootstrap.min":           "bower_components/bootstrap/dist/css/bootstrap.min",
        "css.uFont":                   "app/fonts/uFont/uFont",
        "css.page.pagination":         "app/css/page-pagination",
        "css.page.top.1":              "app/css/page-top-1",
        "css.page.header.1":           "app/css/page-header-1",
        "css.page.headerFixed.1":      "app/css/page-headerFixed-1",
        "css.page.nav.1":              "app/css/page-nav-1",
        "css.page.banner.1":           "app/css/page-banner-1",
        "css.page.banner.2":           "app/css/page-banner-2",
        "css.page.footer.1":           "app/css/page-footer-1",
        "css.page.sideFixed.1":        "app/css/page-sideFixed-1",
        "css.page.info.1":             "app/css/page-info-1",
        "css.page.info.2":             "app/css/page-info-2",
        "css.page.searchCompany.1":    "app/css/page-searchCompany-1",
        "css.page.searchShop.1":       "app/css/page-searchShop-1",
        "css.page.shop.1":             "app/css/page-shop-1",
        "css.page.company.1":          "app/css/page-company-1",
        "css.page.pagination.1":       "app/css/page-pagination-1",


        /** TEMPLATE --模板模块
         */
        "template.page.top.1":              "app/template/page-top-1",
        "template.page.header.1":           "app/template/page-header-1",
        "template.page.headerFixed.1":      "app/template/page-headerFixed-1",
        "template.page.nav.1":              "app/template/page-nav-1",
        "template.page.banner.1":           "app/template/page-banner-1",
        "template.page.banner.2":           "app/template/page-banner-2",
        "template.page.footer.1":           "app/template/page-footer-1",
        "template.page.sideFixed.1":        "app/template/page-sideFixed-1",
        "template.page.info.1":             "app/template/page-info-1",
        "template.page.info.2":             "app/template/page-info-2",
        "template.page.searchCompany.1":    "app/template/page-searchCompany-1",
        "template.page.searchShop.1":       "app/template/page-searchShop-1",
        "template.page.shop.1":             "app/template/page-shop-1",
        "template.page.company.1":          "app/template/page-company-1",
        "template.page.pagination.1":       "app/template/page-pagination-1",


        /** JS --框架/工具
         */
        "bower.jquery":                "bower_components/jquery/dist/jquery.min",
        "bower.bootstrap.min":         "bower_components/bootstrap/dist/js/bootstrap",
        "bower.dotdotdot.min":         "bower_components/jQuery.dotdotdot/src/jquery.dotdotdot.min",
        "bower.can":                   "bower_components/CanJS/can.jquery",
        "bower.fixture":               "bower_components/CanJS/can.fixture",
        "bower.text":                  "bower_components/text/text",
        "bower.css":                   "bower_components/require-css/css",


        /** JS --自定义方法/插件
         */
        "widget.common":               "app/scripts/widget/common",
        "widget.scrollMonitor":        "app/scripts/widget/scrollMonitor",


        /** JS --配置信息
         */
        "config.require":                   "app/scripts/.config/require",
        "config.system":                    "app/scripts/.config/system",
        "config.comm":                      "app/scripts/.config/comm",
        "config.render":                    "app/scripts/.config/render",
        "config.helper":                    "app/scripts/.config/helper",


        /** JS --通讯模块
         */
        "model.comm":                       "app/scripts/model/comm",
        "model.comm.index":                 "app/scripts/model/comm-index",
        "model.comm.nav":                   "app/scripts/model/comm-nav",
        "model.comm.searchCompany":         "app/scripts/model/comm-searchCompany",
        "model.comm.searchShop":            "app/scripts/model/comm-searchShop",
        "model.comm.company":               "app/scripts/model/comm-company",
        "model.comm.company.shop":          "app/scripts/model/comm-company-shop",
        "model.comm.shop":                  "app/scripts/model/comm-shop",


        /** JS --业务模块
         *    control.page:   将页面各部分拆分为模块
         *    control.visit： 加载指定的页面模块（即 control.page.xxx.x）
         */
        "control.page.top.1":               "app/scripts/control/page-top-1",
        "control.page.header.1":            "app/scripts/control/page-header-1",
        "control.page.headerFixed.1":       "app/scripts/control/page-headerFixed-1",
        "control.page.nav.1":               "app/scripts/control/page-nav-1",
        "control.page.banner.1":            "app/scripts/control/page-banner-1",
        "control.page.banner.2":            "app/scripts/control/page-banner-2",
        "control.page.footer.1":            "app/scripts/control/page-footer-1",
        "control.page.sideFixed.1":         "app/scripts/control/page-sideFixed-1",
        "control.page.info.1":              "app/scripts/control/page-info-1",
        "control.page.info.2":              "app/scripts/control/page-info-2",
        "control.page.searchCompany.1":     "app/scripts/control/page-searchCompany-1",
        "control.page.searchShop.1":        "app/scripts/control/page-searchShop-1",
        "control.page.shop.1":              "app/scripts/control/page-shop-1",
        "control.page.company.1":           "app/scripts/control/page-company-1",
        "control.page.pagination.1":        "app/scripts/control/page-pagination-1",
        "control.visit.index.1":            "app/scripts/control/visit-index-1",
        "control.visit.searchCompany.1":    "app/scripts/control/visit-searchCompany-1",
        "control.visit.searchShop.1":       "app/scripts/control/visit-searchShop-1",
        "control.visit.shop.1":             "app/scripts/control/visit-shop-1",
        "control.visit.company.1":          "app/scripts/control/visit-company-1",


        /** JS --组件模块
         */
        "component.page.top.1":              "app/scripts/component/page-top-1",
        "component.page.header.1":           "app/scripts/component/page-header-1",
        "component.page.headerFixed.1":      "app/scripts/component/page-headerFixed-1",
        "component.page.nav.1":              "app/scripts/component/page-nav-1",
        "component.page.banner.1":           "app/scripts/component/page-banner-1",
        "component.page.banner.2":           "app/scripts/component/page-banner-2",
        "component.page.footer.1":           "app/scripts/component/page-footer-1",
        "component.page.sideFixed.1":        "app/scripts/component/page-sideFixed-1",
        "component.page.info.1":             "app/scripts/component/page-info-1",
        "component.page.info.2":             "app/scripts/component/page-info-2",
        "component.page.searchCompany.1":    "app/scripts/component/page-searchCompany-1",
        "component.page.searchShop.1":       "app/scripts/component/page-searchShop-1",
        "component.page.shop.1":             "app/scripts/component/page-shop-1",
        "component.page.company.1":          "app/scripts/component/page-company-1",
        "component.page.pagination.1":       "app/scripts/component/page-pagination-1",


        /** JS --测试模块
         */
        "fixture.test":                      "app/scripts/.fixture/test",
        "fixture.data":                      "app/scripts/.fixture/data",
        "fixture.data.index.1":              "app/scripts/.fixture/data-index-1",
        "fixture.data.nav.1":                "app/scripts/.fixture/data-nav-1",
        "fixture.data.searchCompany.1":      "app/scripts/.fixture/data-searchCompany-1",
        "fixture.data.searchShop.1":         "app/scripts/.fixture/data-searchShop-1",
        "fixture.data.company.1":            "app/scripts/.fixture/data-company-1",
        "fixture.data.company.shop.1":       "app/scripts/.fixture/data-company-shop-1",
        "fixture.data.shop.1":               "app/scripts/.fixture/data-shop-1"

    }

});