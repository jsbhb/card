/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    //根目录
    baseUrl: '/',


    //依赖关系
    shim: {
        'bower.jquery':              { deps: [],                            exports: '$' },
        'bower.underscore':          { deps: [],                            exports: '_' },
        "bower.bootstrap.min":       { deps: ['bower.jquery'],              exports: 'bootstrap' },
        'bower.can':                 { deps: ["bower.jquery"],              exports: 'can' },
        'bower.fixture':             { deps: ["bower.can"],                 exports: 'fixture' },
        'bower.text':                { deps: [],                            exports: 'text' },
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
        "css.page.nav.1":              "app/css/page-nav-1",
        "css.page.banner.1":           "app/css/page-banner-1",
        "css.page.footer.1":           "app/css/page-footer-1",
        "css.page.info.1":             "app/css/page-info-1",
        "css.page.info.2":             "app/css/page-info-2",
        "css.page.searchCompany.1":    "app/css/page-searchCompany-1",
        "css.page.searchShop.1":       "app/css/page-searchShop-1",
        "css.page.shop.1":             "app/css/page-shop-1",
        "css.page.company.1":          "app/css/page-company-1",

        /** JS --框架/工具
         */
        "bower.jquery":                "bower_components/jquery/dist/jquery.min",
        "bower.underscore":            "bower_components/underscore/underscore-min",
        "bower.bootstrap.min":         "bower_components/bootstrap/dist/js/bootstrap.min",
        "bower.can":                   "bower_components/CanJS/can.jquery",
        "bower.fixture":               "bower_components/CanJS/can.fixture",
        "bower.text":                  "bower_components/text/text",
        "bower.css":                   "bower_components/require-css/css",

        /** JS --配置信息
         */
        "config.require":              "app/scripts/.config/require",
        "config.comm":                 "app/scripts/.config/comm",
        "config.path":                 "app/scripts/.config/path",
        "config.util":                 "app/scripts/.config/util",
        "config.helper":               "app/scripts/.config/helper",

        /** JS --数据块
         */
        "data.region":                 "app/scripts/.data/region",

        /** JS --通讯交互
         */
        "comm.index":                  "app/scripts/comm/index",
        "comm.searchCompany":          "app/scripts/comm/searchCompany",
        "comm.searchShop":             "app/scripts/comm/searchShop",
        "comm.shop":                   "app/scripts/comm/shop",
        "comm.company":                "app/scripts/comm/company",
        "comm.nav":                    "app/scripts/comm/nav",

        /** JS --组件
         */
        "component.page.top.1":              "app/scripts/component/page-top-1",
        "component.page.header.1":           "app/scripts/component/page-header-1",
        "component.page.nav.1":              "app/scripts/component/page-nav-1",
        "component.page.banner.1":           "app/scripts/component/page-banner-1",
        "component.page.footer.1":           "app/scripts/component/page-footer-1",
        "component.page.info.1":             "app/scripts/component/page-info-1",
        "component.page.info.2":             "app/scripts/component/page-info-2",
        "component.page.searchCompany.1":    "app/scripts/component/page-searchCompany-1",
        "component.page.searchShop.1":       "app/scripts/component/page-searchShop-1",
        "component.page.pagination":         "app/scripts/component/page-pagination",
        "component.page.shop.1":             "app/scripts/component/page-shop-1",
        "component.page.company.1":          "app/scripts/component/page-company-1",

        /** JS --业务
         *    control.page:   将页面各部分拆分为模块（拥有独自的样式、事件、以及通讯交互）
         *    control.visit： 加载指定的页面模块（即 control.page）, 以生成完整的HTML
         */
        "control.page.top.1":               "app/scripts/control/page-top-1",
        "control.page.header.1":            "app/scripts/control/page-header-1",
        "control.page.nav.1":               "app/scripts/control/page-nav-1",
        "control.page.banner.1":            "app/scripts/control/page-banner-1",
        "control.page.footer.1":            "app/scripts/control/page-footer-1",
        "control.page.info.1":              "app/scripts/control/page-info-1",
        "control.page.info.2":              "app/scripts/control/page-info-2",
        "control.page.searchCompany.1":     "app/scripts/control/page-searchCompany-1",
        "control.page.searchShop.1":        "app/scripts/control/page-searchShop-1",
        "control.page.shop.1":              "app/scripts/control/page-shop-1",
        "control.page.company.1":           "app/scripts/control/page-company-1",
        "control.visit.index.1":            "app/scripts/control/visit-index-1",
        "control.visit.searchCompany.1":    "app/scripts/control/visit-searchCompany-1",
        "control.visit.searchShop.1":       "app/scripts/control/visit-searchShop-1",
        "control.visit.shop.1":             "app/scripts/control/visit-shop-1",
        "control.visit.company.1":          "app/scripts/control/visit-company-1",

        /** JS --测试模块
         */
        "fixture.test":                     "app/scripts/fixture/fixture-test",
        "fixture.data":                     "app/scripts/fixture/fixture-data",
        "fixture.data.index.1":             "app/scripts/fixture/fixture-data-index-1",
        "fixture.data.nav.1":               "app/scripts/fixture/fixture-data-nav-1",
        "fixture.data.searchCompany.1":     "app/scripts/fixture/fixture-data-searchCompany-1",
        "fixture.data.searchShop.1":        "app/scripts/fixture/fixture-data-searchShop-1",
        "fixture.data.company.1":           "app/scripts/fixture/fixture-data-company-1",
        "fixture.data.shop.1":              "app/scripts/fixture/fixture-data-shop-1",

        /** TEMPLATE --模板模块
         */
        "templates.page.top.1":             "app/templates/page-top-1",
        "templates.page.header.1":          "app/templates/page-header-1",
        "templates.page.nav.1":             "app/templates/page-nav-1",
        "templates.page.banner.1":          "app/templates/page-banner-1",
        "templates.page.footer.1":          "app/templates/page-footer-1",
        "templates.page.info.1":            "app/templates/page-info-1",
        "templates.page.info.2":            "app/templates/page-info-2",
        "templates.page.searchCompany.1":   "app/templates/page-searchCompany-1",
        "templates.page.searchShop.1":      "app/templates/page-searchShop-1",
        "templates.page.shop.1":            "app/templates/page-shop-1",
        "templates.page.company.1":         "app/templates/page-company-1",

    }

});