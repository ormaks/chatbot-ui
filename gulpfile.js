var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoPrefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload;

gulp.task('start', ['scss'], function () {
    browserSync.init({
        server: {
            baseDir: "./public"
        },
        tunnel: true,
        host: 'localhost',
        port: 9000,
        logPrefix: "chatbot"
    });

});

//HTML
gulp.task('html', function () {
    return gulp.src('src/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('public'))
        .pipe(reload({stream: true}));
});

//JS
gulp.task('js', function () {
    return gulp.src([
        './node_modules/jquery/dist/jquery.min.js',
        './src/assets/js/main.js'
    ])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/assets/js'))
        .pipe(reload({stream: true}));
});

//SCSS
gulp.task('scss', function () {
    return gulp.src(['src/assets/scss/main.scss'])
        .pipe(sass({outputStyle: 'compressed'})
            .on('error', sass.logError))
        .pipe(autoPrefixer({browsers: ['last 15 version']}))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('public/assets/css'))
        .pipe(reload({stream: true}));
});

//IMAGES
gulp.task('images', function () {
    return gulp.src('src/assets/images/**/*')
        .pipe(imagemin([
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest('public/assets/images'));
});

//FONTS
gulp.task('fonts', function () {
    gulp.src('src/assets/fonts/**/*.*')
        .pipe(gulp.dest('public/assets/fonts'));
});

//WATCH
gulp.task('watch', function () {
    watch([
        'src/assets/scss/**/*.scss'
    ], function () {
        gulp.start('scss');
    });
    watch('src/**/*.html', function () {
        gulp.start('html');
    });
    watch('src/assets/js/**/*.js', function () {
        gulp.start('js');
    });
    watch('src/assets/images/**/*', function () {
        gulp.start('images');
    });
    watch('src/assets/fonts/**/*', function () {
        gulp.start('fonts');
    });
});


//BUILD
gulp.task('build', [
    'scss',
    'html',
    'js',
    // 'images',
    'fonts'
]);

gulp.task('default', ['build', 'start', 'watch']);
