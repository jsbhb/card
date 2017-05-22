/**
 * Created by linpengteng on 2017/5/15.
 */
requirejs.config({

    baseUrl: '/',

    paths: {

        //bower_components
        "jquery": "common/bower_components/jquery/dist/jquery.min",
        "underscore": "common/bower_components/underscore/underscore-min",
        "can": "common/bower_components/CanJS/can.jquery.min",
        "fixture": "common/bower_components/CanJS/can.fixture",

        //app (js)
        "comm.config": "common/app/scripts/comm/comm.config",
        "comm.model": "common/app/scripts/comm/comm.model",
        "fixture.data": "common/app/scripts/fixture/fixture.data",
        "fixture.test": "common/app/scripts/fixture/fixture.test",
        "require.config": "common/app/scripts/require/require.config",

        //app (mustache)
        "mustache_table.body": "template/table.body",
        "mustache_table.head": "template/table.head",
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