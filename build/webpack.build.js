/*
 * @author alikr
 */

const webpack = require("webpack");
const config = require("./webpack.config.js")(true);
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

delete config.devtool;
module.exports = webpackMerge(config, {
    plugins: [
        new ExtractTextPlugin({
            filename: 'css/[name].css',
            disable: false,
            allChunks: true
          }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true,
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                dead_code: true
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]
});
