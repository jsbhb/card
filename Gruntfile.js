//grunt 全部包裹在modele.exports = function(grunt){}中

module.exports = function(grunt) {

    // Configurable paths
    var config = {
        root:    './',
        app:     './app',
        css:     './app/css',
        fonts:   './app/fonts',
        scripts: './app/scripts',
        scss:    './app/scss',
        distscrpits:'./app/dist/scripts',
        distdcss:'./app/dist/css'
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
                port: 9000,
                livereload: 35729
            },
            server: {
                options: {
                    open: true,
                    base: './'
                }
            }
        },

        uglify:{
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'//添加banner
            },
            build:{
                options: {
                    mangle: false, //不混淆变量名
                    preserveComments: 'all', //不删除注释，还可以为 false（删除全部注释），some（保留@preserve @license @cc_on等注释）
                    footer:'\n/*! <%= pkg.name %> 最后修改于： <%= grunt.template.today("yyyy-mm-dd") %> */'//添加footer
                },
                files:[{
                    expand:true,
                    cwd:'<%=config.scripts%>',
                    src:'**/*.js',
                    dest:'<%=config.distscrpits%>',
                    ext:'.min.js'
                }]
            }
        },

        //合并文件
        concat: {
            concatsass: {
                options: {
                    separator: '',
                    stripBanners: true,
                    banner: ''
                },
                files: {
                    '<%= config.scss %>/page.scss': ['<%= config.scss %>/page/{,*/}*.scss']
                }
            }
        },
        wiredep: {
            app: {
                ignorePath: /^\/|\.\.\//,
                src: ['<%= config.root %>/index.html']
            }
        },

        //编译scss文件
        sass:{
            output : {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%=config.app%>/css/page/page.css': '<%=config.app%>/scss/page.scss'
                }
            }
        },

        //监听文件变动
        watch: {
            watchsass : {
                files :['<%=config.scss%>/*/*.scss'],
                tasks : ['concat', 'sass']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%=config.root%>{,**/}*.{html,htm}',
                    '<%=config.css%>/{,**/}*.css'
                ]
            }
        },
    });

    //插件加载代码
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.registerTask('ug',['uglify']);
    grunt.registerTask('wi',['wiredep']);
    //加载任务代码：执行默认任务中的所有方法
    grunt.registerTask('default',['ug','concat', 'sass','connect','watch']);
}

