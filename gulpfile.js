var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
var Server = require('karma').Server;


var dependencies = ['react', 'react-dom'];

var scriptsCount = 0;

gulp.task('scripts', function () {
    bundleApp(false);
});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('watch', function () {
	gulp.watch(['app/**/*.js'], ['scripts']);
});

gulp.task('test', (done) =>
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: false
	}, done).start()
	// gulp.src('test/**/*.spec.js')
	// // gulp-jasmine works on filepaths so you can't have any plugins before it
	// 	.pipe(jasmine())
);

gulp.task('lint', () => {
	return gulp.src(['app/**/*.js','!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('default', ['scripts', 'watch']);

function bundleApp(isProduction) {
	scriptsCount++;
	var appBundler = browserify({
    	entries: './app/app.js',
    	debug: true
  	});

  	if (!isProduction && scriptsCount === 1){
  		browserify({
			require: dependencies,
			debug: true
		})
			.bundle()
			.on('error', gutil.log)
			.pipe(source('vendors.js'))
			.pipe(gulp.dest('./web/js/'));
  	}
  	if (!isProduction){
  		dependencies.forEach(function(dep){
  			appBundler.external(dep);
  		})
  	}

  	appBundler
	  	.transform("babelify", {presets: ["es2015", "react"]})
	    .bundle()
	    .on('error',gutil.log)
	    .pipe(source('bundle.js'))
	    .pipe(gulp.dest('./web/js/'));
}
