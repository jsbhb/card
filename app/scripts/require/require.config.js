/**
 * Created by linpengteng on 2017/5/22.
 */
requirejs.config({

    baseUrl: '/',

    paths: {

        //bower_components
        "jquery": "bower_components/jquery/dist/jquery.min",
        "underscore": "bower_components/underscore/underscore-min",
        "can": "bower_components/CanJS/can.jquery.min",
        "fixture": "bower_components/CanJS/can.fixture",

        //app (js)
        "comm.config": "app/scripts/comm/comm.config",
        "comm.model": "app/scripts/comm/comm.model",
        "fixture.data": "app/scripts/fixture/fixture.data",
        "fixture.test": "app/scripts/fixture/fixture.test",
        "require.config": "app/scripts/require/require.config",
        "page.header.top": "app/scripts/page/page.header.top",
        "page.header.center": "app/scripts/page/page.header.center",

        //app (mustache)
        "page-header-top": "app/templates/page/page-header-top",
        "page-header-center": "app/templates/page/page-header-center"

    },

    shim: {
        'can': {
            deps: ['jquery'],
            exports: 'can'
        },
        'fixture': {
            deps: ['can'],
            exports: 'fixture'
        },
        'fixture.test': {
            deps: ['fixture'],
            exports: 'fixture.test'
        }
    }

})