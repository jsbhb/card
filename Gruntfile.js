//grunt 全部包裹在modele.exports = function(grunt){}中

module.exports = function(grunt) {

    //路径配置
    var config = {
        root:    './',
        app:     './app',
        css:     './app/css',
        fonts:   './app/fonts',
        images:  './app/images',
        scripts: './app/scripts',
        scss:    './app/scss'
    };

    //任务配置代码
    grunt.initConfig({

        //读取package.json文件
        pkg: grunt.file.readJSON('package.json'),

        // 项目默认配置
        config: config,

        // 服务器参数设置
        connect: {
            options: {
                hostname: '127.0.0.1',
                port: 8000,
                livereload: 35730
            },
            server: {
                options: {
                    open: true,
                    base: './'
                }
            }
        },

        //编译scss文件
        sass:{
            output : {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%=config.css%>/page-top-1.css':        '<%=config.scss%>/page-top-1.scss',
                    '<%=config.css%>/page-header-1.css':     '<%=config.scss%>/page-header-1.scss',
                    '<%=config.css%>/page-nav-1.css':        '<%=config.scss%>/page-nav-1.scss',
                    '<%=config.css%>/page-banner-1.css':     '<%=config.scss%>/page-banner-1.scss',
                    '<%=config.css%>/page-footer-1.css':     '<%=config.scss%>/page-footer-1.scss',
                    '<%=config.css%>/page-info-1.css':       '<%=config.scss%>/page-info-1.scss',
                    '<%=config.css%>/page-info-2.css':       '<%=config.scss%>/page-info-2.scss',
                    '<%=config.css%>/page-search-1.css':     '<%=config.scss%>/page-search-1.scss',
                }
            }
        },

        //监听文件变动
        watch: {
            watchsass : {
                files :[
                    '<%=config.scss%>/{,**/}*.scss',
                ],
                tasks : ['sass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%=config.root%>/{,**/}*.{html,htm}',
                    '<%=config.css%>/{,**/}*.css'
                ]
            }
        },
    });

    //插件加载代码
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //加载任务代码：执行默认任务中的所有方法
    grunt.registerTask('default', ['sass','connect','watch']);

}

