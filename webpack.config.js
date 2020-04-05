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
        new CopyWebpackPlugin([{ // copies directories
                from: './public',
                to: './public'
            },
        ])
    ],
};