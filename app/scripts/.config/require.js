/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    baseUrl: '/',

    shim: {
        'bower.jquery':      { deps: [],                exports: '$' },
        'bower.underscore':  { deps: [],                exports: '_' },
        'bower.can':         { deps: ["bower.jquery"],  exports: 'can' },
        'bower.fixture':     { deps: ["bower.can"],     exports: 'fixture' },
        'bower.text':        { deps: [],                exports: 'text' }
    },

    paths: {
        // ------------------- bower_components ----------------------
        //实用工具(框架)
        "bower.jquery":      "bower_components/jquery/dist/jquery.min",
        "bower.underscore":  "bower_components/underscore/underscore-min",
        "bower.can":         "bower_components/CanJS/can.jquery",
        "bower.fixture":     "bower_components/CanJS/can.fixture",
        "bower.text":        "bower_components/text/text",

        // --------------------- app/scripts -------------------------
        //配置(基类)
        "config.require":  "app/scripts/.config/require",
        "config.comm":     "app/scripts/.config/comm",

        //通讯(Model)
        "comm.city":  "app/scripts/comm/city",
        "comm.nav":   "app/scripts/comm/nav",
        "comm.infoA":   "app/scripts/comm/infoA",
        "comm.infoB":   "app/scripts/comm/infoB",

        //组件(模板/插件)
        "component.page.header.top":     "app/scripts/component/page-header-top",
        "component.page.header.center":  "app/scripts/component/page-header-center",
        "component.page.body.nav":       "app/scripts/component/page-body-nav",
        "component.page.body.infoA":     "app/scripts/component/page-body-infoA",
        "component.page.body.infoB":     "app/scripts/component/page-body-infoB",

        //业务(页面/数据)
        "control.page":                "app/scripts/control/page",
        "control.page.header.top":     "app/scripts/control/page-header-top",
        "control.page.header.center":  "app/scripts/control/page-header-center",
        "control.page.body.nav":       "app/scripts/control/page-body-nav",
        "control.page.body.infoA":     "app/scripts/control/page-body-infoA",
        "control.page.body.infoB":     "app/scripts/control/page-body-infoB",

        //模拟(REST)
        "fixture.test":           "app/scripts/fixture/fixture-test",
        "fixture.data":           "app/scripts/fixture/fixture-data",
        "fixture.data.region":    "app/scripts/fixture/fixture-data-region",
        "fixture.data.nav":       "app/scripts/fixture/fixture-data-nav",
        "fixture.data.infoA":     "app/scripts/fixture/fixture-data-infoA",
        "fixture.data.infoB":     "app/scripts/fixture/fixture-data-infoB",

        // -------------------- app/templates --------------------------
        //模板(页面/组件)
        "templates.page.header.top": "app/templates/page-header-top",
        "templates.page.header.center": "app/templates/page-header-center",
        "templates.page.body.nav": "app/templates/page-body-nav",
        "templates.page.body.infoA": "app/templates/page-body-infoA",
        "templates.page.body.infoB": "app/templates/page-body-infoB"
    }

})