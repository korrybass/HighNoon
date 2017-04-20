var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
const eslint = require('gulp-eslint');
const jasmine = require('gulp-jasmine');
var Server = require('karma').Server;
var livereload = require('gulp-livereload');
var webserver = require('gulp-server-livereload');
var opn = require('opn');

var dependencies = ['react', 'react-dom'];

var scriptsCount = 0;

var server = {
  host: 'localhost',
  port: '9999'
}

gulp.task('scripts', function () {
    bundleApp(false);

});

gulp.task('deploy', function (){
	bundleApp(true);
});

gulp.task('watch', function () {
	// livereload.listen();
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

// gulp.task('default', ['scripts', 'watch']);

var buildTasks = ['scripts'];

gulp.task('default', ['scripts', 'webserver', 'watch' ]);

gulp.task('openbrowser', function() {
  opn( 'http://' + server.host + ':' + server.port );
});

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
			.pipe(gulp.dest('./web/js/'))
			// .pipe(livereload());
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

gulp.task('webserver', function() {
  gulp.src( './' )
    .pipe(webserver({
      host:             server.host,
      port:             server.port,
      livereload:       false,
      directoryListing: false,
			open: true
    }));
});
