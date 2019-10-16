module.exports = function (grunt) {
  require('jit-grunt')(grunt);
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    autoprefixer: {
      development: {
        options: {
          browsers: ['> 0.1%', 'last 2 versions', 'Opera 12.1', 'Firefox ESR', 'ie >= 10'],
          map: true
        },
        files: [{
          expand: true, // Enable dynamic expansion
          flatten: true, // Remove all path parts from generated dest paths.
          src: ['css/*.css'],
          dest: 'css/'
        }],
      }
    },
    imagemin: {
      options: {
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
      },
      development: {
        files: ['**/*.{png,jpg,gif,jpeg}']
      }
    },
    sass: {
      development: {
        options: {
          sourcemap: 'inline',
          trace: true,
          style: 'expanded',
          debugInfo: false,
          lineNumbers: true,
        },
        files: {
          'css/screen.purge.css' : ['sass/screen.scss'],
          // 'css/editor-style.css' : ['sass/editor-style.scss'],
        }
      },
      production: {
        options: {
          sourcemap: false,
          trace: false,
          style: 'compressed',
          noCache: true,
        },
        files: {
          'css/screen.purge.css' : 'sass/screen.scss'
        }
      }
    },
    browserSync: {
      bsFiles: {
        src : [
          './*.html',
          'css/*.css',
          'js/*.js'
        ]
      },
      options: {
        watchTask: true,
        baseDir: './',
        server: './'
      }
    },
    watch: {
      sass: {
        files: ['./sass/*.scss', './sass/**/*.scss'],
        tasks: ['sass:development', 'autoprefixer']
      },
      html: {
        files: ['./*.html']
      },
      js: {
        files: ['js/site.js', 'js/**/*.js', '!js/site.min.js'],
        tasks: ['uglify:development']
      }
    },
    uglify: {
      development: {
        options: {
          preserveComments: 'all',
          beautify: true,
          mangle: {
            reserved: ['jQuery']
          }
        },
        files: {
          'js/site.min.js': ['js/**/*.js', 'js/*.js','!js/site.min.js']
        }
      },
      production: {
        options: {
          compress: {
            drop_console: true
          },
          preserveComments: false,
          mangle: {
            reserved: ['jQuery']
          }
        },
        files: {
          'js/site.min.js': ['js/**/*.js', 'js/*.js','!js/site.min.js']
        }
      }
    }
  });
  grunt.registerTask('default', ['uglify:development', 'sass:development']);
  // for cutups
  grunt.registerTask('html', ['uglify:development', 'sass:development', 'browserSync', 'watch']);
  grunt.registerTask('wp', ['uglify:development', 'sass:development', 'watch']);
  // for live projects
  grunt.registerTask('production', ['uglify:production','sass:production', 'autoprefixer']);
};