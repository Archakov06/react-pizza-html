const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const ejs = require('gulp-ejs');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('scss', () => {
  return gulp
    .src('src/scss/*.scss')
    .pipe(
      sass({ includePaths: ['node_modules'], outputStyle: 'compressed', errLogToConsole: true }).on(
        'error',
        sass.logError,
      ),
    )
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
        errLogToConsole: true,
      }).on('error', sass.logError),
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false,
      }),
    )
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  return gulp
    .src('src/js/*.js')
    .pipe(
      babel({
        presets: ['@babel/env'],
      }),
    )
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('ejs', () => {
  return gulp
    .src(['src/ejs/*.ejs'])
    .pipe(plumber())
    .pipe(ejs({}, {}, { ext: '.html' }))
    .pipe(gulp.dest('./public'));
});

gulp.task('serve', () => {
  gulp.watch('src/scss/**/*.scss', gulp.series('scss'));
  gulp.watch('src/ejs/**/*.ejs', gulp.series('ejs'));
  gulp.watch('src/js/**/*.js', gulp.series('js'));

  browserSync.init({
    server: './public',
    port: 4444,
  });
  gulp.watch('public/*.html').on('change', browserSync.reload);
  gulp.watch('public/js/*.js').on('change', browserSync.reload);
});

gulp.task('build', gulp.series('ejs', 'js', 'scss'));

gulp.task('default', gulp.series('serve'));
