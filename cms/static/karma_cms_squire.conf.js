// Common JavaScript tests, using RequireJS.
//
//
// To run all the tests and print results to the console:
//
//   karma start lms/static/js_test_coffee.js
//
//
// To run the tests for debugging: Debugging can be done in any browser but Chrome's developer console debugging experience is best.
//
//   karma start lms/static/js_test_coffee.js --browsers=BROWSER --single-run=false
//
//
// To run the tests with coverage and junit reports:
//
//   karma start lms/static/js_test_coffee.js --browsers=BROWSER --coverage --junitreportpath=<xunit_report_path> --coveragereportpath=<report_path>
//
// where `BROWSER` could be Chrome or Firefox.
//
//

var path = require('path');

/**
 * Customize the name attribute in xml testcase element
 * @param {Object} browser
 * @param {Object} result
 * @return {String}
 */
function junitNameFormatter(browser, result) {
    return result.suite[0] + ": " + result.description;
}


/**
 * Customize the classname attribute in xml testcase element
 * @param {Object} browser
 * @param {Object} result
 * @return {String}
 */
function junitClassNameFormatter(browser, result) {
    return "Javascript." + browser.name.split(" ")[0];
}


/**
 * Return array containing default and user supplied reporters
 * @param {Object} config
 * @return {Array}
 */
function reporters(config) {
    var defaultReporters = ['dots', 'junit', 'kjhtml'];
    if (config.coverage) {
        defaultReporters.push('coverage')
    }
    return defaultReporters;
}


/**
 * Split a filepath into basepath and filename
 * @param {String} filepath
 * @return {Object}
 */
function getBasepathAndFilename(filepath) {
    if (!filepath) {
        // these will configure the reporters to create report files relative to this karma config file
        return {
            dir: undefined,
            file: undefined
        };
    }

    var file = filepath.replace(/^.*[\\\/]/, ''),
        dir = filepath.replace(file, '');

    return {
        dir: dir,
        file: file
    }
}


/**
 * Return coverage reporter settings
 * @param {String} config
 * @return {Object}
 */
function coverageSettings(config) {
    var path = getBasepathAndFilename(config.coveragereportpath);
    return {
        dir: path.dir,
        subdir: '.',
        reporters: [
            {type: 'cobertura', file: path.file},
            {type: 'text-summary'}
        ]
    };
}


/**
 * Return junit reporter settings
 * @param {String} config
 * @return {Object}
 */
function junitSettings(config) {
    var path = getBasepathAndFilename(config.junitreportpath);
    return {
        outputDir: path.dir,
        outputFile: path.file,
        suite: 'javascript', // suite will become the package name attribute in xml testsuite element
        useBrowserName: false,
        nameFormatter: junitNameFormatter,
        classNameFormatter: junitClassNameFormatter
    };
}

var frameFiles = [
    '../../node_modules/jquery/dist/jquery.js',
    '../../node_modules/jasmine-core/lib/jasmine-core/jasmine.js',
    '../../node_modules/karma-jasmine/lib/boot.js',
    '../../node_modules/karma-jasmine/lib/adapter.js',
    '../../node_modules/jasmine-jquery/lib/jasmine-jquery.js',
    '../../node_modules/karma-jasmine-jquery/lib/jasmine-jquery.js',
    '../../node_modules/requirejs/require.js',
    '../../node_modules/karma-requirejs/lib/adapter.js'
];

var customPlugin = {
  'framework:custom': ['factory', function(/*config.files*/files) {
      frameFiles.reverse().forEach(function (f) {
          files.unshift({
              pattern: path.join(__dirname, f),
              included: true,
              served: true,
              watch: false
          });
      });

      console.log(files);
  }]
};


module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['custom'],

        plugins: [
            'karma-jasmine',
            'karma-jasmine-html-reporter',
            'karma-jasmine-jquery',
            'karma-requirejs',
            'karma-junit-reporter',
            'karma-coverage',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            customPlugin
        ],


        // list of files / patterns to load in the browser
        files: [
            {pattern: 'xmodule_js/common_static/js/vendor/requirejs/require.js', included: false},
            {pattern: 'xmodule_js/common_static/coffee/src/ajax_prefix.js', included: false},
            {pattern: 'xmodule_js/common_static/js/src/utility.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jquery.min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jquery-ui.min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jquery.cookie.js', included: false},
            {pattern: 'xmodule_js/common_static/common/js/vendor/underscore.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/underscore.string.min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/backbone-min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/backbone-associations-min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/backbone.paginator.min.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/timepicker/jquery.timepicker.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jquery.leanModal.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jquery.form.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/html5-input-polyfills/number-polyfill.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/sinon-1.17.0.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/Squire.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/jasmine-imagediff.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/CodeMirror/codemirror.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/domReady.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/URI.min.js', included: false},
            {pattern: 'xmodule_js/src/xmodule.js', included: false},
            {pattern: 'xmodule_js/common_static/coffee/src/jquery.immediateDescendents.js', included: false},
            {pattern: 'xmodule_js/common_static/js/test/i18n.js', included: false},
            {pattern: 'xmodule_js/common_static/js/xblock/**/*.js', included: false},
            {pattern: 'xmodule_js/common_static/coffee/src/xblock/**/*.js', included: false},
            {pattern: 'xmodule_js/common_static/js/vendor/URI.min.js', included: false},
            {
                pattern: 'xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.iframe-transport.js',
                included: false
            },
            {pattern: 'xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.fileupload.js', included: false},
            {
                pattern: 'xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.fileupload-process.js',
                included: false
            },
            {
                pattern: 'xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.fileupload-validate.js',
                included: false
            },
            {pattern: 'xmodule_js/common_static/js/vendor/requirejs/text.js', included: false},

            // Paths to source JavaScript files
            {pattern: 'coffee/src/**/*.js', included: false},
            {pattern: 'js/collections/**/*.js', included: false},
            {pattern: 'js/models/**/*.js', included: false},
            {pattern: 'js/utils/**/*.js', included: false},
            {pattern: 'js/views/**/*.js', included: false},
            {pattern: 'common/js/**/*.js', included: false},

            // Paths to spec (test) JavaScript files
            {pattern: 'coffee/spec/**/*.js', included: false},
            {pattern: 'js/spec/**/*.js', included: false},

            // Paths to fixture files
            {pattern: 'coffee/fixtures/**/*.*', included: false},
            {pattern: 'templates/**/*.*', included: false},
            {pattern: 'common/templates/**/*.*', included: false},

            // override fixture path and other config.
            {pattern: 'test_config.js', included: true},
            'coffee/spec/main_squire.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        //preprocessors: {
        //    'coffee/src/**/*.js': ['coverage']
        //},


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/
        //
        // karma-reporter
        reporters: reporters(config),


        coverageReporter: coverageSettings(config),


        junitReporter: junitSettings(config),


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_DEBUG,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Firefox'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
};