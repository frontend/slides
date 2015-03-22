'use strict';

/**
 * Import plugins
 */
var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    runSequence = require('run-sequence'),
    argv = require('yargs').argv,
    del = require('del');

/**
 * Build vendors dependencies
 */
gulp.task('vendors', function() {

  /**
   * CSS VENDORS
   */
  gulp.src([
        'bower_components/reveal.js/css/reveal.css',
        'bower_components/highlightjs/styles/monokai.css',
        'bower_components/slabText/css/slabtext.css'
      ])
      .pipe($.concat('vendors.css'))
      .pipe($.minifyCss())
      .pipe(gulp.dest('build/css'));

  /**
   * JS VENDORS
   * (with jQuery and Bootstrap dependencies first)
   */

  gulp.src([
      'bower_components/jquery/dist/jquery.js',
      'bower_components/reveal.js/lib/js/head.min.js',
      'bower_components/highlightjs/highlight.pack.js',
      'bower_components/reveal.js/js/reveal.js',
      'bower_components/emojify.js/emojify.js',
      'node_modules/reveal-code-focus/code-focus.js',
      'bower_components/slabText/js/jquery.slabtext.js'
    ])
    .pipe($.concat('vendors.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));

  gulp.src([
      'bower_components/reveal.js/lib/js/classList.js',
      'bower_components/reveal.js/plugin/markdown/marked.js',
      'bower_components/reveal.js/plugin/markdown/markdown.js',
      'bower_components/reveal.js/plugin/highlight/highlight.js',
      'bower_components/reveal.js/plugin/zoom-js/zoom.js',
      'bower_components/reveal.js/plugin/notes/notes.js'
    ])
    .pipe(gulp.dest('build/js/lib'));


  /**
   * FONTS SOURCES
   * Important to add the bootstrap fonts to avoid issues with the fonts include path
   */
  gulp.src([
      'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
      'assets/fonts/*'
    ])
    .pipe(gulp.dest('build/fonts'));

  /**
   * POLYFILLS SOURCES
   * Various polyfills required for old IE
   */
  gulp.src([
      'bower_components/html5shiv/dist/html5shiv.js',
      'bower_components/respond/dest/respond.src.js'
    ])
    .pipe($.concat('polyfills.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));

  gulp.src([
      'bower_components/emojify.js/images/emoji/*'
    ])
    .pipe(gulp.dest('build/img/emoji'));
});

/**
 * Compile TWIG example pages
 */

gulp.task('twig', function () {
    return gulp.src('assets/topics/*.twig')
        .pipe($.twig())
        .pipe(gulp.dest('build'));
});

/**
 * Copy images
 */
gulp.task('img', function() {
  gulp.src([
      'assets/img/**/*'
    ])
    .pipe(gulp.dest('build/img'));
});

/**
 * Build styles from SCSS files
 * With error reporting on compiling (so that there's no crash)
 */
gulp.task('styles', function() {
  if (argv.production) { console.log('[styles] Processing styles for production env.' ); }
  else { console.log('[styles] Processing styles for dev env. No minifying here, for sourcemaps!') }
  return gulp.src(['assets/sass/theme.scss'])
    .pipe($.rubySass({style: 'compact'}))
      .on('error', $.notify.onError(function (error) {
         console.log(error.message);
         if (!argv.production) {
           return 'Message to the notifier: ' + error.message;
         }
      }))
    .pipe($.if(!argv.production, $.sourcemaps.init()))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'ff 27', 'opera 12.1'],
      cascade: false
    }))
    .pipe($.if(argv.production, $.minifyCss()))
    // .pipe($.if(!argv.production, $.sourcemaps.write('.')))
    .pipe(gulp.dest('build/css'));
});

/**
 * Build JS
 * With error reporting on compiling (so that there's no crash)
 * And jshint check to highlight errors as we go.
 */
gulp.task('scripts', function() {
  return gulp.src('assets/js/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.concat('main.js'))
    .pipe(gulp.dest('build/js'))
    .pipe($.rename({ suffix: '.min' }))
    .pipe($.uglify())
    .pipe(gulp.dest('build/js'));
});


/**
 * Clean output directories
 */
gulp.task('clean', del.bind(null, ['build']));

/**
 * Serve
 */
gulp.task('serve', ['styles', 'scripts', 'twig'], function () {
  browserSync({
    server: {
      baseDir: ['build'],
    },
    open: false
  });
  gulp.watch(['assets/sass/**/*.scss'], function() {
    runSequence('styles', reload);
  });
  gulp.watch(['assets/img/**/*'], function() {
    runSequence('img', reload);
  });
  gulp.watch(['assets/js/**/*.js'], function() {
    runSequence('scripts', reload);
  });
  gulp.watch(['assets/topics/**/*'], function() {
    del.bind(null, ['build'])
    runSequence('twig', reload);
  });
});

/**
 * Deploy to GH pages
 */

gulp.task('deploy', function () {
  gulp.src("build/**/*")
    .pipe($.ghPages());
});

/**
 * Task to build assets on production server
 */
gulp.task('build',['clean'], function() {
    argv.production = true;
    runSequence('vendors', 'styles', 'img', 'scripts');
});

/**
 * Default task
 */
gulp.task('default', ['clean'], function(cb) {
  runSequence('vendors', 'styles', 'img', 'scripts', 'twig', cb);
});

