import autoprefixer from 'autoprefixer';
import del from 'del';
import util from 'util';
import gulp from 'gulp';
import babel from 'gulp-babel';
import changed from 'gulp-changed';
import concat from 'gulp-concat';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import imagemin from 'gulp-imagemin';
import svgSprite from 'gulp-svg-sprite';
import plumber from 'gulp-plumber';
import postcss from 'gulp-postcss';
import posthtml from 'gulp-posthtml';
import pug from 'gulp-pug';
import sass from 'gulp-sass';
import stylelint from 'gulp-stylelint';
import uglify from 'gulp-uglify';
import minifyCSS from 'postcss-clean';
import validateHTML from 'posthtml-w3c';

// Config
const config = require('./gulpfile.config.json');

// Clean
const clean = () => del('build/');
export {clean}

export function views() {
    return gulp.src('src/app/views/*.pug')
        .pipe(plumber(function (error) {
            util.log(error.message);
            this.emit('end');
        }))
        .pipe(changed('build/'))
        .pipe(pug({
            "pretty": true
        }))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
}

// Styles
export function styles() {
    return gulp.src('src/app/assets/stylesheets/app.scss')
        .pipe(plumber(function (error) {
            util.log(error.message);
            this.emit('end');
        }))
        .pipe(sass({
            "outputStyle": "expanded",
            "precision": "3"
        }))
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(postcss([
            minifyCSS()
        ]))
        .pipe(gulp.dest('build/css/'))
        .pipe(connect.reload());
}

// Vendor scripts
export function vendorScripts() {
    return gulp.src([
            "node_modules/fontfaceobserver/fontfaceobserver.js",
            "node_modules/svg4everybody/dist/svg4everybody.js"
        ])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('build/js/'));
}

// Scripts
export function scripts() {
    return gulp.src([
            // "src/app/assets/js/config.babel.js",
            // "src/app/assets/js/variables.babel.js",
            "src/app/assets/js/util.babel.js",
            "src/app/assets/js/main.babel.js"
        ])
        .pipe(plumber(function (error) {
            util.log(error.message);
            this.emit('end');
        }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('build/js/'))
        .pipe(connect.reload());
}

// Fonts
export function fonts() {
    return gulp.src('src/app/assets/fonts/**/*.{woff,woff2}', {since: gulp.lastRun(fonts)})
        .pipe(gulp.dest('build/fonts'))
        .pipe(connect.reload());
}

// Images
export function images() {
    return gulp.src('src/app/assets/images/**/*.{gif,jpg,jpeg,png}', {since: gulp.lastRun(images)})
        .pipe(imagemin([
            imagemin.gifsicle({
                "interlaced": true
            }),
            imagemin.jpegtran({
                "progressive": true
            }),
            imagemin.optipng({
                "optimizationLevel": 7
            }),
            imagemin.svgo({
                "plugins": [
                    {
                        "cleanupIDs": false
                    }
                ]
            })
        ]))
        .pipe(gulp.dest('build/img/'))
        .pipe(connect.reload());
}

export function svgSprites() {
    return gulp.src('src/app/assets/images/icons/**/*.svg', { cwd: '' })
        .pipe(plumber())
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest : 'img/',
                    sprite : 'sprite.svg',
                }
            }
        }))
        .pipe(plumber(function (error) {
            util.log(error.message);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/'));
}

// Files
export function files() {
    return gulp.src('src/public/**/*', {since: gulp.lastRun(files)})
        .pipe(plumber(function (error) {
            util.log(error.message);
            this.emit('end');
        }))
        .pipe(gulp.dest('build/'))
        .pipe(connect.reload());
}

// Server
export function connectServer() {
    connect.server({
        "host": "0.0.0.0",
        "port": 3030,
        "root": "build/",
        "livereload": true
    });
}

// Watch
export function watch() {
    gulp.watch('src/app/views/**/*.pug', views);
    gulp.watch('src/app/assets/stylesheets/**/*.scss', styles);
    gulp.watch('src/app/assets/js/**/*.js', scripts);
    gulp.watch('src/app/assets/fonts/**/*.{woff,woff2}', fonts);
    gulp.watch('src/app/assets/images/**/*.{gif,jpg,jpeg,png}', images);
    gulp.watch('src/app/assets/images/icons/**/*.svg', svgSprites);
    gulp.watch('src/public/**/*', files);
}

// Lint views
export function lintViews() {
    return gulp.src('build/*.html')
        .pipe(posthtml([
            validateHTML()
        ]));
}

// Lint styles
export function lintStyles() {
    return gulp.src('buld/css/app.css')
        .pipe(stylelint({
            "failAfterError": false,
            "fix": true,
            "reporters": [
                {
                    "formatter": "string",
                    "console": true
                }
            ]
        }))
        .pipe(gulp.dest('build/css/'));
}

// Lint scripts
export function lintScripts() {
    return gulp.src('build/js/app.js')
        .pipe(eslint({
            "fix": true
        }))
        .pipe(eslint.format())
        .pipe(gulp.dest('build/js/'));
}

// Tasks
gulp.task('default', gulp.parallel(connectServer, watch));

const build = gulp.series(clean, gulp.parallel(views, styles, scripts, fonts, svgSprites, images, files));
export {build}

const lint = gulp.parallel(lintViews, lintStyles, lintScripts);
export {lint}