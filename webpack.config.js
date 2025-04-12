const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        publicPath: '',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'), // уточняем путь к директории
        },
        open: true,
        hot: true, // включаем горячую замену модулей
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource', // обработка изображений
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // используем шаблон index.html из папки src
            filename: 'index.html', // имя выходного файла
            inject: 'body', // инжектит скрипты в тело страницы
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ],
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development', // режим разработки или production
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map', // для дебага в production
};
