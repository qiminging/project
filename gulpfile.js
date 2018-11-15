const gulp = require("gulp");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const cleanCSS = require('gulp-clean-css');
const webserver = require('gulp-webserver');
const sass = require("gulp-sass-china")

gulp.task("static", () =>{
    gulp.src("./src/js/libs/*.js").pipe(gulp.dest("./online/js/libs"));
    gulp.src("./src/images/*").pipe(gulp.dest("./online/images"));
});

gulp.task('refreshHTML',function(){
    gulp.src("./src/html/*.html").pipe(gulp.dest('./online/html'))
})

gulp.task('refreshSCSS', () => {
    gulp.src('./src/css/*.scss').pipe(sass().on('error', sass.logError))
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./online/css'));

});

gulp.task('refreshCSS', () => {
    gulp.src('./src/css/*.css')
    // .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./online/css'));
});

gulp.task('refreshJS',()=>{
    gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./online/js'))
});

gulp.task("build",["refreshHTML","refreshSCSS","refreshJS","refreshCSS","static"])

gulp.task('watch',()=>{
    gulp.watch("./src/html/*",["refreshHTML"]);
    gulp.watch('./src/css/*.scss',["refreshSCSS"]);
		gulp.watch('./src/css/*.css',["refreshCSS"]);
    gulp.watch("./src/js/*.js",["refreshJS"]);
});

gulp.task('webserver',['watch'], function() {
    gulp.src('./online')
      .pipe(webserver({
          livereload: true,
      }));
  });

