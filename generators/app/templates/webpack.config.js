const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, { debugMode }) => ({
  entry: {
    index: './src/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].${env}.bundle.js`,
  },
  stats: {
    warnings: false,
    assets: false,
    modules: false,
    hash: false,
    version: false,
    entrypoints: false,
    builtAt: false,
    timings: false,
  },

  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  devtool: debugMode === 'enabled' ? 'source-map' : 'none',
  module: {
    rules: [
      {
        // Transpiles ES6-8 into ES5
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new webpack.IgnorePlugin(/^pg-native$/),
    new CleanWebpackPlugin(),
    new NodemonPlugin({
      nodeArgs: [debugMode === 'enabled' ? '--inspect' : ''],
    }), // Dong
    new webpack.DefinePlugin({
      'process.env.API_ENV': JSON.stringify(env),
      'process.env.DEBUG_MODE': JSON.stringify(debugMode),
    }),
    new FileManagerPlugin({
      onEnd: {
        copy: [{ source: './src/locales', destination: './dist/locales' }],
      },
    }),
  ],
  resolve: {
    alias: {
      '@<%= appNameUpperCamelCase %>': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        parallel: true,
        terserOptions: {
          keep_fnames: true,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
