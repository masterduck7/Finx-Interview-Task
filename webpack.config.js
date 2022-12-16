const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { title } = require('process');

const APP_DIR = path.resolve(__dirname, './src');
const BUILD_DIR = path.resolve(__dirname, './dist');

module.exports = {
    mode: 'development',
    entry: {
        bundle: APP_DIR + '/index.js'
    },
    output: {
        path: BUILD_DIR,
        filename: '[name].[contenthash].js'
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname + 'dist')
        },
        port: 3000,
        hot: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/react']
                    }
                }
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'Finx App',
                filename: 'index.html',
                template: 'src/template.html',
            }
        )
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
};