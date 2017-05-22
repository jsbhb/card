/**
 * Created by linpengteng on 2017/5/15.
 */
requirejs.config({

    baseUrl: '/app',

    paths: {
        "jquery": "../../bower_components/jquery/dist/jquery",
        "can": "../../bower_components/canjs/amd/can",
        "demo_mustache": "scripts/full/demo_mustache",
        "mustache_header": "templates/header/demo_header",
        "mustache_center": "templates/center/demo_center",
        "mustache_tfoot": "templates/tfoot/demo_tfoot"
    }

    // shim: {
    //     'can': {
    //         deps: ['jquery'],
    //         exports: 'can'
    //     }
    // }

});