'use strict';

const path = require('path');
const chokidar = require('chokidar');
const cp = require('child_process');

const watcher = chokidar.watch(path.join(__dirname, 'src', 'services'));

let appIns = cp.fork(path.join(__dirname, '/src/services/server.js'));

watcher.on('ready', () => {

    watcher.on('change', (path, stats) => {
        if (stats) {
            console.log(`File ${path} changed size to ${stats.size}`);
        }

        console.log('<---- watched file change ---->');

        appIns = reload(appIns)

    });

    watcher.on('add', (path) => {

        console.log('<---- watched new file add ---->');
        appIns = reload(appIns)

    });

    watcher.on('unlink', (path) => {

        console.log('<---- watched file remove ---->');
        appIns = reload(appIns)

    });
});


function reload(appIns) {

    appIns.kill('SIGINT');

    return cp.fork(path.join(__dirname, '/src/services/server.js'));

}
