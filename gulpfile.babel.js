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

// [clean] : clean build folder -> app
gulp.task('clean', cb => {
    rimraf( paths.destination, cb );
});

// [flow] : excute unix, linux command
gulp.task('flow', shell.task([
    'flow'
], { ignoreErrors: true }));

// [babel] : babel compiler로 app폴더로 typeScript compile 진행
gulp.task('babel', shell.task([
    'babel src --out-dir app'
]));

 

let express;

// [server] : babel로 컴파일된 ts기반의 express서버 구동
gulp.task('server', () => {
    express = server.new( paths.destination );
});

gulp.task('restart', () => {
    express.start.bind( express )();
});

// [watch] : src내부의 소스 변경시 다시 build를 해준다.
gulp.task('watch', () => {
    return watch( paths.js, () => {
        gulp.start( 'build' );
    });
});


