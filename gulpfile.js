"use strict";

const gulp = require("gulp");
const replace = require("gulp-replace");
const concat = require("gulp-concat");

function css() {
    return gulp
        .src("docs/main.css")
        .pipe(concat("main.css"))
        .pipe(replace('*,:after,:before{color:#000!important;text-shadow:none!important;background:transparent!important;box-shadow:none!important}', ''))
        .pipe(gulp.dest('docs'));
}

const build = gulp.series(gulp.parallel(css));

exports.css = css;
exports.default = build;
