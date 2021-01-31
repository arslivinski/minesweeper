'use strict';

const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = function webpackConfigFactory(env) {
  const isProduction = env === 'production';
  const isDevelopment = !isProduction;

  return {
    mode: isProduction ? 'production' : 'development',
    bail: isProduction,

    entry: path.resolve(__dirname, 'src', 'main.jsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProduction ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      chunkFilename: isProduction ? 'js/[name].[contenthash:8].chunk.js' : 'js/[name].chunk.js',
      pathinfo: isDevelopment,
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json'],
    },

    module: {
      strictExportPresence: true,
      rules: [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  cacheDirectory: true,
                  cacheCompression: false,
                },
              },
            },
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
              sideEffects: true,
            },
            {
              // JavaScript and CSS loaders are declared above.
              // HTML and JSON will be loaded with WebPack internal loaders.
              // Everything else will be loaded with file-loader.
              exclude: /\.(js|css|html|json)/,
              use: {
                loader: 'file-loader',
                options: {
                  name: 'static/media/[name].[hash:8].[ext]',
                },
              },
            },
            // New loaders should come before the file-loader,
            // otherwise it will not work.
          ],
        },
      ],
    },

    plugins: [
      new HtmlPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],

    devtool: 'source-map',
    devServer: {
      disableHostCheck: true,
      compress: true,
      clientLogLevel: 'none',
      host: process.env.HOST || '0.0.0.0',
      contentBase: path.resolve(__dirname, 'public'),
      historyApiFallback: true,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  };
};
