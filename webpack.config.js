const {resolve} = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('webpack-uglify-harmony');

const path =  resolve(__dirname, 'public/build');

module.exports = {
    entry: {
        app: './src/app.js',
    },
    output: {
        path: path,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    devtool: 'inline-source-map',
    watch: true,
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules\/(?!(webgl-core)\/)/,
            loader: 'babel-loader'
        }, {
            test: /\.less$/,
            exclude: /node_modules/,
            loader: ExtractTextPlugin.extract("css-loader?sourceMap!less-loader?sourceMap")
        }, {
            test: /\.(glsl)$/,
            loader: 'raw-loader',
            exclude: /node_modules\/(?!(webgl-core)\/)/
        }]
    },
    plugins: [
        /*
         new UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false
            },
            sourceMap: false,
         }),
         */
        new webpack.LoaderOptionsPlugin(),
        new ExtractTextPlugin('/app.bundle.css')
    ],
};