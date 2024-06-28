var gulp = require('gulp'),
sass = require('gulp-sass')(require('sass')),
sassGlob = require('gulp-sass-glob'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
del = require('del'),
include = require('gulp-include'),
flatmap = require('gulp-flatmap'),
path = require('path');

function cleanCss() {
  return del(['./dist/css/**/*']);
}

function cleanJs() {
  return del(['./dist/js/**/*']);
}

function cleanImg() {
  return del(['./dist/img/**/*']);
}

function css(filename) {
  return gulp.src(['./src/sass/bundles/' + filename + '.scss'])
  .pipe(sassGlob())
  .pipe(concat(filename + '.min.css'))
  .pipe(sass({ outputStyle: 'compressed' }))
  .pipe(gulp.dest('./dist/css/'));
}

function js(filename) {
  return gulp.src('./src/js/bundles/' + filename + '.js')
  .pipe(flatmap(function (stream, file) {
    var name = path.basename(file.path);
    var minifiedFilename = name.replace('.js', '.min.js');
    return gulp.src(['./src/js/bundles/' + name])
    .pipe(include())
    .pipe(concat(minifiedFilename))
    .pipe(uglify({compress: { unused : false}}))
    .on('error', swallowError)
    .pipe(gulp.dest('./dist/js/'));
  }));
}

function moveImg() {
  return gulp.src(['./src/img/**/*']).pipe(gulp.dest('./dist/img'));
}

function mainCss() { return css('main'); }
function mainJs() { return js('main'); }

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('build', gulp.series(
  cleanCss,
  cleanJs,
  cleanImg,
  moveImg,
  mainCss,
  mainJs
));

gulp.task('watch', function () {
  
  gulp.watch('./src/sass/**/*', gulp.series(
    cleanCss,
    mainCss
  ));
  
  gulp.watch('./src/js/**/*', gulp.series(
    cleanJs,
    mainJs
  ));

});
