const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const {
  NODE_ENV
} = process.env;


module.exports = {
  mode: 'production',
  devtool: 'source-map',
  entry: slsw.lib.entries,
  target: 'node',
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        include: __dirname,
        exclude: [
          /node_modules/,
          /stacks-map\.js$/
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      }
    ]
  },
  // plugins: [
  //   new CopyWebpackPlugin([
  //     '.env',
  //   ]),
  // ],
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
};
