module.exports = function(grunt) {
    /*jshint evil:true */



    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-bg-shell');
    grunt.loadNpmTasks('grunt-curl');
    grunt.loadNpmTasks('grunt-zip');
    //https://github.com/vkadam/grunt-jsbeautifier
    //grunt.loadNpmTasks('grunt-jsbeautifier');

    grunt.registerTask('default', ['build']);
    //grunt.registerTask('build', ['clean', 'jshint', 'html2js', 'concat', 'uglify', 'copy']);
    grunt.registerTask('build', ['concat']);
    grunt.registerTask('install-components', ['curl-dir', 'unzip', 'copy']);

    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? " * " + pkg.homepage + "\\n" : "" %>' + ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;\n' + ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        componentsdir: 'components',
        wwwcomponentsdir: 'www/components',


        'curl-dir': {
            downzip: {
                src: ['http://code.angularjs.org/1.2.0-rc.3/angular-1.2.0-rc.3.zip',
                    'http://leaflet-cdn.s3.amazonaws.com/build/leaflet-0.6.4.zip',
                    'https://github.com/topcoat/topcoat/archive/v0.8.0.zip',
                    'http://fortawesome.github.io/Font-Awesome/assets/font-awesome-4.0.0.zip'
                ],
                dest: '<%= componentsdir %>'
            }
        },

        'unzip': {
            angular: {
                src: '<%= componentsdir %>/angular-1.2.0-rc.3.zip',
                dest: '<%= componentsdir %>'
            },
            leaflet: {
                src: '<%= componentsdir %>/leaflet-0.6.4.zip',
                dest: '<%= componentsdir %>/leaflet-0.6.4'
            },
            topcoat: {
                src: '<%= componentsdir %>/v0.8.0.zip',
                dest: '<%= componentsdir %>'
            },
            fontawesome: {
                src: '<%= componentsdir %>/font-awesome-4.0.0.zip',
                dest: '<%= componentsdir %>'
            }
        },

        copy: {
            angular: {
                cwd: '<%= componentsdir %>/angular-1.2.0-rc.3/',
                src: ['angular.min.js',
                    'angular-touch.min.js'
                ],
                dest: '<%= wwwcomponentsdir %>/angular/', //,
                flatten: true,
                expand: true,
                filter: 'isFile'
            },

            leaflet: {
                cwd: '<%= componentsdir %>/leaflet-0.6.4/',
                src: ['**', '!leaflet-src.js', '!leaflet.ie.css'],
                dest: '<%= wwwcomponentsdir %>/leaflet/',
                expand: true
            },

            fontawesome: {
                cwd: '<%= componentsdir %>/font-awesome-4.0.0/',
                src: ['css/font-awesome.min.css', 'fonts/**'],
                dest: '<%= wwwcomponentsdir %>/font-awesome/',
                expand: true
            },

            topcoat: {
                cwd: '<%= componentsdir %>/topcoat-0.8.0/',
                src: ['css/topcoat-mobile-light.min.css',
                    'font/SourceSansPro-Regular.otf',
                    'font/SourceSansPro-Light.otf',
                    'font/SourceSansPro-Semibold.otf',
                    'img/**'
                ],
                dest: '<%= wwwcomponentsdir %>/topcoat/',
                expand: true
            }

        },

        // concat: {
        //     options: {
        //       separator: ';',
        //     },
        //     js: {
        //       src: ['src/intro.js', 'src/project.js', 'src/outro.js'],
        //       dest: 'dist/built.js',
        //     },
        //   },
        connect: {
            server: {
                options: {
                    port: 9000,
                    keepalive: true
                }
            }
        }
    };

    /*grunt.log.writeln(JSON.stringify(gruntConfig, null, 4));*/

    grunt.initConfig(gruntConfig);
};