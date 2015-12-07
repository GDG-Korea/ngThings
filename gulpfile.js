// TODO:
// 1. 파일 배포 방식 결정하고, 빌드 및 배포 부분 수정
// 2. 소스 파일 위치 정해지면 watch 붙이기.
// 3. electron-prebuilt랑 연동.

var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var $ = require('gulp-load-plugins')();

gulp.task('default', function () {
});

gulp.task('build', function () {

});

gulp.task('clean', function () {

});

// TODO: src 폴더 위치 수정해야 함. 실제 폴더 위치가 어디일지 몰라서 임시로 src로 했음.
gulp.task('compile-ts', ['clean-ts', 'ts-lint'], function () {
  return gulp.src('src/**/*.ts')
    .pipe(ts({
      noImplicitAny: true
    }))
    .pipe(gulp.dest('built'));
});

gulp.task('clean-ts', function () {
  del(['built'], {dot: true});
});

// TODO: tslint 에서 체크할 항목 결정해서 설정 파일 변경해야 함. 일단 MS에서 만든 tslint 파일 가져다가 복붙.
gulp.task('ts-lint', function () {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});
