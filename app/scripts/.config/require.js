/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    baseUrl: '/',

    shim: {
            'can':           { deps: ['jquery'],  exports: 'can' },
            'fixture':       { deps: ['can'],     exports: 'fixture' },
            'fixture.test':  { deps: ['fixture'], exports: 'fixture.test' }
    },

    paths: {
        // --------------------- bower_components -------------------
            //实用工具(框架)
            "jquery":      "bower_components/jquery/dist/jquery.min",
            "underscore":  "bower_components/underscore/underscore-min",
            "can":         "bower_components/CanJS/can.jquery.min",
            "fixture":     "bower_components/CanJS/can.fixture",
            "text":        "bower_components/text/text",

        // --------------------- app/scripts -------------------------
            //配置(基类)
            "config.require":  "app/scripts/.config/require",
            "config.comm":     "app/scripts/.config/comm",

            //通讯(Model)
            "comm.query.city":  "app/scripts/comm/query-city",
            "comm.query.nav":   "app/scripts/comm/query-nav",

            //模板组件
            "component.page.header.top":     "app/scripts/component/page-header-top",
            "component.page.header.center":  "app/scripts/component/page-header-center",
            "component.page.body.nav":       "app/scripts/component/page-body-nav",

            //页面(业务)
            "control.page":                "app/scripts/control/page",
            "control.page.header.top":     "app/scripts/control/page-header-top",
            "control.page.header.center":  "app/scripts/control/page-header-center",
            "control.page.body.nav":       "app/scripts/control/page-body-nav",

            //模拟REST
            "fixture.data":  "app/scripts/fixture/fixture-data",
            "fixture.test":  "app/scripts/fixture/fixture-test",

        // -------------------- app/templates --------------------------
            //页面模板
            "templates.page.header.top": "app/templates/page-header-top",
            "templates.page.header.center": "app/templates/page-header-center",
            "templates.page.body.nav": "app/templates/page-body-nav"
    }

})