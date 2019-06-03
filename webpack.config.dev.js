const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: {
        'player': './src/js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name].bundle.js"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].bundle.css"
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            inject: true
        }),
        new CopyWebpackPlugin([{
            from: 'static',
            to: path.resolve(__dirname, 'dist') + '/static',
            toType: 'dir',
            cache: false
        }])
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_module/,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[path][name].[ext]?[hash]'
                    }
                }
            }
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        hot: true,
        inline: true,
        https: false,
        disableHostCheck: true,
        // headers: {
        //     "Access-Control-Allow-Origin": "http://imasdk.googleapis.com",
        //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        //     "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization",
        //     "Access-Control-Allow-Credentials": "true"
        // },
    }
};
