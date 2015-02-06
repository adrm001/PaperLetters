module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({

        copy: {
            svgjs: {
                cwd:'src/svgjs/',
                src: '*.min.js',
                dest: 'dist/js/',
                expand: true
            },
            js: {
                cwd: 'src',
                src: 'js/*',
                dest: 'dist/',
                expand: true
            },
            html:{
                cwd: 'src',
                src: 'test.html',
                dest: 'dist/',
                expand: true
            }
        },

        clean: {
            dist: {
                src: [ 'dist' ]
            }
        },

        cssmin: {
            dist: {
                files: {
                    'dist/css/AM.min.css': [ 'src/css/*.css' ]
                }
            }
        },

        uglify: {
            build: {
                //options: {
                //    mangle: true
                //},
                files: {
                    'dist/js/AM.min.js': [ 'src/js/*.js' ]
                }
            }
        }

    });

    // load the tasks
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // define the tasks

    grunt.registerTask(
        'dist',
        'publishes the site to dist directory.',
        [ 'clean', 'copy', 'cssmin', 'uglify' ]
    );
};