var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCss = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var inject = require('gulp-inject');

var cssFiles = ['./public/*.css', './public/**/*.css', '!./public/build/*.css'];
var jsFiles = ['./public/*.js', './public/**/*.js', '!./public/build/*.js'];
var destFolder = './public/build/';

gulp.task('css-concat', function() {
    return gulp.src(cssFiles)
        .pipe(concat('all.css'))
        .pipe(gulp.dest(destFolder));
});

gulp.task('js-concat', function() {
    return gulp.src(jsFiles)
        .pipe(concat('all.js'))
        .pipe(gulp.dest(destFolder));
});

gulp.task('css-uglify', ['css-concat'], function() {
    return gulp.src([destFolder + 'all.css'])
        .pipe(cleanCss())
        .pipe(gulp.dest(destFolder));
});

gulp.task('js-uglify', ['js-concat'], function() {
    return gulp.src([destFolder + 'all.js'])
        .pipe(uglify())
        .pipe(gulp.dest(destFolder));
});

gulp.task('dev-inject', function() {
    return gulp.src('./public/main.html')
        .pipe(inject(gulp.src(cssFiles, {read: false}),
                {ignorePath: 'public', addRotSlash: false}))
        .pipe(inject(gulp.src(jsFiles, {read: false}),
                {ignorePath: 'public', addRootSlash: false}))
        .pipe(gulp.dest('./public/'));
});

gulp.task('prod-inject', ['css-uglify', 'js-uglify'], function() {
    return gulp.src('./public/main.html')
        .pipe(inject(gulp.src([destFolder + 'all.js'], {read: false}), {ignorePath: 'public', addRootSlash: false}))
        .pipe(inject(gulp.src([destFolder + 'all.css'], {read: false}), {ignorePath: 'public', addRootSlash: false}))
        .pipe(gulp.dest('./public'));
});

gulp.task('development', ['dev-inject']);

gulp.task('production', ['prod-inject']);
