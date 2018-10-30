const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')

gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
    return gulp.src([
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-i18n/angular-locale_pt-br.js',
        'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/admin-lte/plugins/slimScroll/jquery.slimscroll.min.js',
        'node_modules/admin-lte/dist/js/app.min.js',
    ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/assets/js'))
})

gulp.task('deps.css', () => {
    return gulp.src([
        'node_modules/angular-toastr/dist/angular-toastr.min.css',
        'bower_components/font-awesome/web-fonts-with-css/css/fontawesome.min.css',
        'bower_components/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/admin-lte/dist/css/AdminLTE.min.css',
        'node_modules/admin-lte/dist/css/skins/_all-skins.min.css',
    ])
    .pipe(uglifycss({ 'uglyComments': true }))
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/assets/css'))
})

gulp.task('deps.fonts', () => {
    return gulp.src([
        'bower_components/font-awesome/web-fonts-with-css/webfonts/*.*',
        'node_modules/admin-lte/bootstrap/fonts/*.*',
    ])
    .pipe(gulp.dest('public/assets/fonts'))
})