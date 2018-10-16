const path = require('path');
const gulpConfig = require('./gulp.config');


let entry = gulpConfig.entry;
let packageTasks = [];
Object.keys(entry).forEach(function (key) {
    packageTasks.push('webpack-'+key);
});

module.exports = {
    entry:entry,
    output:{
        path:path.resolve(__dirname, './public/dist'),
        filename: 'js/[id].bundle.js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
};
