const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, 'build'),
        port: 8000,
        open: true,
        hot: true,
        compress: true,
        watchFiles: ['src/**/*'],
        devMiddleware: {
            writeToDisk: true,
        },
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: [/node_modules/, /package-lock.json/],
                use:  'ts-loader'
            },
            
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'], 
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),

        new MiniCssExtractPlugin({
            filename: '[name].css', 
        }),
    ],

    resolve: {
        extensions: ['.ts', '.js']
    }
};
