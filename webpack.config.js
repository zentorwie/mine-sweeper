const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', 'jsx', '.json', 'css', 'less']
    },
    module: {
        rules: [{
            // Include ts, tsx, and js files.
            test: /\.(tsx?)|(jsx?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.(less|css)$/,
            use: [
                'style-loader', 'css-loader', 'less-loader'
            ]
        }],
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        hot: true,
        contentBase: './build'
    },
    plugins: [
        new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            title: 'React!',
            template: './public/index.html'
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
};