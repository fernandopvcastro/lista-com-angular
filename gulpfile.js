var gulp = require('gulp');
var bs = require('browser-sync').create();
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var pump = require('pump');
var wait = require('gulp-wait');

gulp.task('sass', function(){
    var stream = gulp.src('src/sass/style.scss')
    .pipe(wait(500));

    stream = stream

    // comentar para producao
    // .pipe(sourcemaps.init())

    .pipe(sass({
        outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss([
        autoprefixer({
            browsers: ['last 5 versions']
        })
    ]))

    // comentar para producao
    // .pipe(sourcemaps.write())

    return stream

    .pipe(concat('style.css'))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
    .pipe(bs.stream());
});

gulp.task('default', function(){
    bs.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/sass/**/*.scss", ['sass']).on('change', bs.reload);
    gulp.watch("src/js/**/*.js").on('change', bs.reload);
    gulp.watch("**/*.html").on('change', bs.reload);
});