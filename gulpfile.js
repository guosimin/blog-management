const gulp = require('gulp');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const gulpConfig = require('./gulp.config');
const gulpSequence = require('gulp-sequence');


let entry = gulpConfig.entry;
let packageTasks = [];

Object.keys(entry).forEach(function (key) {
    gulp.task('webpack-'+key,function () {
        return gulp.src(entry[key])
            .pipe(webpackStream({
                output:{
                    filename:'js/'+key+'.bundle.js'//打包后的名字
                }
            }))
            .pipe(gulp.dest('./public/dist'));
    });
    packageTasks.push('webpack-'+key);
});

gulp.task('js',gulpSequence(...packageTasks));

gulp.task('watch',function () {
    Object.keys(entry).forEach(function (key) {
        gulp.watch(entry[key],['webpack-'+key]);
    });
    // gulp.watch('./public/javascripts/page/**/index.js',['js']);
});

