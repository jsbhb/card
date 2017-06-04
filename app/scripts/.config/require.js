/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    //根目录
    baseUrl: '/',

    //依赖关系
    shim: {
        'bower.jquery':         { deps: [],                exports: '$' },
        'bower.underscore':     { deps: [],                exports: '_' },
        "bower.bootstrap.min":  { deps: ['bower.jquery'],  exports: 'bootstrap' },
        'bower.can':            { deps: ["bower.jquery"],  exports: 'can' },
        'bower.fixture':        { deps: ["bower.can"],     exports: 'fixture' },
        'bower.text':           { deps: [],                exports: 'text' },
    },

    //模块路径
    paths: {
        //CSS -样式模块
        "css.font.awesome.min":        "bower_components/font-awesome/css/font-awesome.min",
        "css.bootstrap.min":           "bower_components/bootstrap/dist/css/bootstrap.min",
        "css.uFont":                   "app/fonts/uFont/uFont",
        "css.page.top.1":              "app/css/page-top-1",
        "css.page.header.1":           "app/css/page-header-1",
        "css.page.nav.1":              "app/css/page-nav-1",
        "css.page.banner.1":           "app/css/page-banner-1",
        "css.page.footer.1":           "app/css/page-footer-1",
        "css.page.info.1":             "app/css/page-info-1",
        "css.page.info.2":             "app/css/page-info-2",

        //JS -框架/工具模块
        "bower.jquery":                "bower_components/jquery/dist/jquery.min",
        "bower.underscore":            "bower_components/underscore/underscore-min",
        "bower.bootstrap.min":         "bower_components/bootstrap/dist/js/bootstrap.min",
        "bower.can":                   "bower_components/CanJS/can.jquery",
        "bower.fixture":               "bower_components/CanJS/can.fixture",
        "bower.text":                  "bower_components/text/text",
        "bower.css":                   "bower_components/require-css/css",

        //JS -配置模块
        "config.require":              "app/scripts/.config/require",
        "config.comm":                 "app/scripts/.config/comm",

        //JS -数据模块
        "data.nav.1":                  "app/scripts/.data/nav-1",
        "data.region.1":               "app/scripts/.data/region-1",

        //JS -通讯模块
        "comm.page.index.1":           "app/scripts/comm/page-index-1",

        //JS -组件模块
        "component.page.top.1":        "app/scripts/component/page-top-1",
        "component.page.header.1":     "app/scripts/component/page-header-1",
        "component.page.nav.1":        "app/scripts/component/page-nav-1",
        "component.page.banner.1":     "app/scripts/component/page-banner-1",
        "component.page.footer.1":     "app/scripts/component/page-footer-1",
        "component.page.info.1":       "app/scripts/component/page-info-1",
        "component.page.info.2":       "app/scripts/component/page-info-2",

        //JS -业务模块
        "control.page.index.1":        "app/scripts/control/page-index-1",
        "control.page.top.1":          "app/scripts/control/page-top-1",
        "control.page.header.1":       "app/scripts/control/page-header-1",
        "control.page.nav.1":          "app/scripts/control/page-nav-1",
        "control.page.banner.1":       "app/scripts/control/page-banner-1",
        "control.page.footer.1":       "app/scripts/control/page-footer-1",
        "control.page.info.1":         "app/scripts/control/page-info-1",
        "control.page.info.2":         "app/scripts/control/page-info-2",

        //JS -测试模块
        "fixture.test":                "app/scripts/fixture/fixture-test",
        "fixture.data":                "app/scripts/fixture/fixture-data",
        "fixture.data.page.index.1":   "app/scripts/fixture/fixture-data-page-index-1",

        //TEMPLATE -模板模块
        "templates.page.top.1":        "app/templates/page-top-1",
        "templates.page.header.1":     "app/templates/page-header-1",
        "templates.page.nav.1":        "app/templates/page-nav-1",
        "templates.page.banner.1":     "app/templates/page-banner-1",
        "templates.page.footer.1":     "app/templates/page-footer-1",
        "templates.page.info.1":       "app/templates/page-info-1",
        "templates.page.info.2":       "app/templates/page-info-2",
    }

});