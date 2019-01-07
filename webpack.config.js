require('@babel/polyfill');
const path = require('path');

module.exports = {
    entry: {
        app: ['@babel/polyfill', './client/src/app.js'],
        records: ['@babel/polyfill', './client/src/screens/recordsTable/leaderBoard.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './client/dist'),
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
};
