
//grunt 全部包裹在 modele.exports = function(grunt){} 中
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

        //编译scss文件
        sass:{
            output : {
                options: {
                    style: 'expanded'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=config.scss%>',
                        src: ['**/*.scss'],
                        dest: '<%=config.css%>',
                        extDot: "last",
                        ext:  '.css'
                    }
                ]
            }
        },

        //压缩图片大小
        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 3 //定义 PNG 图片优化水平
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%=config.images%>',
                        src: ['**/*.{png,jpg,jpeg,gif,PNG,JPG,JPEG,GIF}'],
                        dest: '<%=config.images%>'
                    }
                ]
            }
        },

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
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');


    //执行任务：grunt执行默认任务中的所有方法（注意：单独执行sass、imagemin任务, 以减少启动项目的时间）
    grunt.registerTask('default', ['connect', 'watch']);

};

