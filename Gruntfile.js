//grunt 全部包裹在modele.exports = function(grunt){}中

module.exports = function(grunt) {

    var sassStyle = 'expanded';

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist',
        tmp: '.tmp',
        publish: 'publish',
        timestamp: Date.now()
    };

    //任务配置代码
    grunt.initConfig({

        // Project settings
        config :config,

        pkg: grunt.file.readJSON('package.json'),

        //压缩css文件
        sass:{
            output : {
                options: {
                    style: sassStyle
                },
                files: {
                    '<%=config.app%>/style.css': '<%=config.app%>/scss/{,*/}*.scss'
                }
            }
        },
        //结合js文件
        // concat: {
        //     dist: {
        //         src: ['<%= config.app %>/scripts/{,*/}*.js'],
        //         dest: '<%= config.app %>/global.js',
        //     },
        // },
        //压缩js
        // uglify: {
        //     compressjs: {
        //         files: {
        //             '<%= config.app %>/global.min.js': ['<%= config.app %>/global.js']
        //         }
        //     }
        // },
        //检查js语法
        jshint: {
            all: ['app/scripts/full/demo_mustache.js']
        },

        //监听文件变动
        watch: {
            scripts: {
                files: ['<%=config.app%>/scripts/{,*/}*.js'],
                tasks: ['jshint']
            },
            sass: {
                files: ['<%=config.app%>/scss/{,*/}*.scss'],
                tasks: ['sass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%=config.app%>/index.html',
                    '<%=config.app%>/style.css'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                open: true,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            server: {
                options: {
                    port: 9001,
                    base: './app'
                }
            }
        }
    });

    //插件加载代码
    //load the plugin that provides the 'scss' task
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    //加载任务代码：执行默认任务中的所有方法
    // Default task(s).
    grunt.registerTask('outputcss', ['sass']);
    // grunt.registerTask('concatjs',['concat']);
    // grunt.registerTask('compressjs',['concat','jshint','uglify']);
    grunt.registerTask('watchit',['sass','connect','watch']);
    //加载任务代码：执行uglify中指定的方法
    grunt.registerTask('default');

}

