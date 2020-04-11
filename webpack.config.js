const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    target: 'node',
    mode: 'production',
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin(), // deletes dist before build starts
        new CopyWebpackPlugin([ // copies directories
            { 
                from: './public',
                to: './public'
            },
            {
                from: './tmp',
                to: './tmp'
            }
        ])
    ],
    module: {
        rules: [
            /**
             * @Todo jshint-loader throws an error with webpack 4
             * it will be fixed in a future update of webpack-loader
             */
            // {
            //     test: /\.js$/,
            //     enforce: 'pre',
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: `jshint-loader`,
            //         },
            //     ]
            // },
        ]
    },
};