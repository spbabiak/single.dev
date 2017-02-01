// Объявляем наши плагины

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var pug = require('gulp-pug');

// Создаём sass-задание
// gulp.src - путь по которому лежит scss-файл, который мы будем компилировать
// gulp.dest - путь в который мы будем генерировать наш css-файл
// plumber() - не выбрасывать из компилятора, если есть ошибки
// errLogToConsole: true - выводить номер строки, в которой допущена ошибка

// Просматриваем папку, в которой лежит scss-файл, который мы хотим скомпилировать,
// и при любом изменении файлов из этой папки запускаем задание sass
gulp.task('sass', function() {
	gulp.src('scss/main.scss')
	.pipe(plumber())
	.pipe(sass({
		errLogToConsole: true,
		outputStyle: 'expanded'
	}))
	.pipe(gulp.dest('./css'));
});

gulp.task('pug', function buildHTML() {
	gulp.src('views/*.pug')
	.pipe(plumber())
	.pipe(pug({
		pretty: true,
        compileDebug: true}))
	.pipe(gulp.dest('./'));
});

gulp.task('default', function() {
	gulp.run('sass');
	gulp.run('pug');
	gulp.watch('scss/*.scss', function(event) {
		gulp.run('sass');
	});
    gulp.watch('views/*.pug', function(event) {
        gulp.run('pug');
    });
});

