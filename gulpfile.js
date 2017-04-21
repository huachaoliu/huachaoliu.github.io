var gulp = require('gulp')
    , minifycss = require('gulp-minify-css')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , del = require('del');

gulp.task('default', ['build']);

gulp.task('minifycss', function () {

    var srcFiles = [
        'static/css/reset.css',
        'static/css/style.css'
    ];

    return gulp.src(srcFiles, {"base": "static"})
        .pipe(rename({suffix: ".min"}))
        .pipe(minifycss({
            advanced: true,
            compatibility: 'ie9+',
            keepBreaks: false,
            keepSpecialComments: '*'
        }))
        .pipe(gulp.dest("build/static"));
});

gulp.task('minifyjs', function () {
    var srcFiles = [
        'static/js/components/ui.js',
        'static/js/components/wrapper.js',
        'static/js/components/navbar.js',
        'static/js/components/menubar.js',
        'static/js/components/navigation.js',
        'static/js/components/sidebar.js',
        'static/js/components/content.js',
        'static/js/components/footer.js',
        'static/js/components/pages/home.js',
        'static/js/components/pages/category.js',
        'static/js/components/pages/article.js',
        'static/js/components/datas/homeFiles.js',
        'static/js/components/datas/categoryFiles.js',
        'static/js/stores/store.js',
        'static/js/tools/tool.js',
    ];
    return gulp.src(srcFiles, { "base": "static" })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest("build/static")); //输出文件
});

gulp.task('clean', function (callback) {
    return del(['build/*']);
})

gulp.task('build', [ 'minifycss', 'minifyjs'], function (callback) {
    callback();
});