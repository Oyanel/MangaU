let gulp = require('gulp');
let less = require('gulp-less');
let concat = require('gulp-concat');
let cssbeautify = require('gulp-cssbeautify');
let cssmin = require('gulp-cssmin');
let rename = require('gulp-rename');
let path = require('path');

gulp.task('build', function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('style.css'))
        .pipe(cssbeautify({indent: '  '}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('watch-less', function () {
    console.log('watching...');
    gulp.watch('./src/less/**/*.less');
});

gulp.task('prod', function () {
    return gulp.src('./src/less/**/*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});

// Tâche "build"
gulp.task('dev', ['build', 'watch-less']);

// Tâche par défaut
gulp.task('default', ['dev']);