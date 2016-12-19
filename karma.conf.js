module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['browserify', 'jasmine'],
        files: [
            // 'app/**/*.js',
            'test/**/*.js'
        ],
        sourceType: "module",
        browsers: ["PhantomJS"],
        preprocessors: {
            // 'app/**/*.js': ['browserify'],
            'test/**/*.spec.js': ['browserify']
        },
        singleRun: false,
        browserify: {
            configure: function browserify(bundle) {
                bundle.once('prebundle', function prebundle() {
                    bundle.transform('babelify', {
                        presets: ['es2015', 'react', 'stage-0']
                    })
                });
            }
        }
    });
};