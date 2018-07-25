const gulpSequence = require('gulp-sequence');
const {join} = require('path');
const replace = require('replace');
const gulp = require('gulp')
const exec = require('child_process').exec;
const {readdirSync, statSync} = require('fs');


function dirs(rootDir) {
    return readdirSync(rootDir).filter(f => statSync(join(rootDir, f)).isDirectory()).map(dir => `${rootDir}/${dir}`)
};


function execCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, {}, function (err, stdout, stderr) {
            if (stderr || err) {
                console.log(stderr || err);
                return reject(stderr || err)
            }
            else if (stdout) {
                console.log(stdout);
                return resolve(stdout)
            }
        });
    })
}

function getProjectDirs() {
    return  [...dirs('./mock'), ...dirs('./be'), './fe']
}
function doNpmCommandOnAllDirs(npmCommand, done) {
    const promises = [];
    getProjectDirs().forEach(dir => {
        const commend = `cd ${dir} && npm run ${npmCommand}`;
        console.log(commend);
        promises.push(execCommand(commend))
    });
    Promise.all(promises).then(() => {
        done()
    }).catch(err => done(err))
}

//
// gulp.task('removeZone', function (done) {
//     currentDeploy = deploy.noZone;
//     replace({
//         regex: '\import \'zone.js',
//         replacement: '\/\/ import \'zone.js',
//         // replacement: '\'build/dist/src/app/app/',
//         paths: ['../../src/polyfills.ts'],
//         recursive: false,
//         silent: false
//     });
//     return done()
// });


gulp.task('testAll', (done) => {
    doNpmCommandOnAllDirs('test', done)
});


// gulp.task('sequenceWithZone', gulpSequence('addZone', 'webPackcompile', 'concat'));

// gulp.task('sequenceNoZone', gulpSequence('removeZone', 'webPackcompile', 'concat', 'addZone'));

// gulp.task('createCdn', gulpSequence('clean', 'sequenceWithZone', 'cleanDist', 'sequenceNoZone'));