const gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream');


gulp.task("js",function(){
    return browserify('index.js')
    .transform('babelify', {
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(gulp.dest('build'));
});




gulp.task("watch", function(){
    gulp.watch("js/*.js",['js']);
});

gulp.task("build",["js"]);
