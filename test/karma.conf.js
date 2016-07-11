// Karma configuration
// Generated on 2016-05-19

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      'jasmine',
      'browserify'
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-css/angular-css.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/ng-rap/index.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/AdminLTE/dist/js/app.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/api-check/dist/api-check.js',
      'bower_components/angular-formly/dist/formly.js',
      'bower_components/angular-formly-templates-bootstrap/dist/angular-formly-templates-bootstrap.js',
      'bower_components/PACE/pace.js',
      'bower_components/SparkMD5/spark-md5.js',
      'bower_components/jspdf/dist/jspdf.debug.js',
      'bower_components/angular-mocks/angular-mocks.js',
      // endbower
      'app/scripts/**/*.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],
    preprocessors: {
      'test/spec/services/beian-manager.js': [ 'browserify' ]
    },

    browserify: {
      debug: true
    },
    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-browserify'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
