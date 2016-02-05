var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

gulp.task('concat', function() {
    return gulp.src(['./public/*.js', './public/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./public/build/'));
});

gulp.task('uglify', ['concat'], function() {
    return gulp.src(['./public/build/all.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./public/build'))
});

gulp.task('dev-inject', function() {
    return gulp.src('./public/main.html')
        .pipe(inject(gulp.src(['./public/*.js', './public/**/*.js', '!./public/build/*.js'], {read: false}),
                     {ignorePath: 'public', addRootSlash: false}))
        .pipe(gulp.dest('./public'));
});

gulp.task('prod-inject', ['uglify'], function() {
    return gulp.src('./public/main.html')
        .pipe(inject(gulp.src(['./public/build/all.js'], {read: false}), {ignorePath: 'public', addRootSlash: false}))
        .pipe(gulp.dest('./public'));
});

gulp.task('development', ['dev-inject']);

gulp.task('production', ['prod-inject']);