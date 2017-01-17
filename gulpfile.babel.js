import gulp from 'gulp';
import shell from 'gulp-shell';
import rimraf from 'rimraf';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server'

const paths = {
    js: ['./src/**/*.js'],
    destination: './app'
};

gulp.task('default', cb =>{
    run( 'server', 'build', 'watch', cb );
});

gulp.task('build', cb => {
    run( 'clean', 'flow', 'babel', 'restart', cb );
});

// clean build folder -> app
gulp.task('clean', cb => {
    rimraf( paths.destination, cb );
});

//excute unix, linux command
gulp.task('flow', shell.task([
    'flow'
], { ignoreErrors: true }));

gulp.task('babel', shell.task([
    'babel src '
]));


let express;
gulp.task('server', () =>{
    express = server.new( paths.destination );
});
