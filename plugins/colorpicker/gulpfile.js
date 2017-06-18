var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsConfig = ts.createProject('tsconfig.json');

gulp.task('default', function () {
    return tsConfig.src()
        .pipe(tsConfig())
        .js.pipe(gulp.dest('build'));
});