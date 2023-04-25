const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'index.[contenthash].js',
        assetModuleFilename:'images/[name].[contenthash][ext]',
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff2?|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            // {
            //     test: /\.svg$/,
            //     type: 'asset/resource',
            //     generator: {
            //        filename: 'icons/[name].[contenthash][ext]',
            //     },
            // },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)$/i,
            //     type: 'asset/resource',
            // },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/template.html',
            // template: path.join(__dirname, 'src', 'template.html'),
            filename: 'index.html',
        }),
        new FileManagerPlugin({
            events: {
                onStart: {
                    delete: ['dist'],
                },
           },
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
    ],
    devServer: {
        watchFiles: path.join(__dirname, 'src'),
        port: 9000,
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
            minimizer: {
            implementation:
            ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
                ['svgo', { name: 'preset-default' }],
              ],
            },
          },
        }),
      ],
    },
};