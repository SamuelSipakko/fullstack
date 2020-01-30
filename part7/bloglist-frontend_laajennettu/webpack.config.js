/* eslint-disable */
const path = require('path')

const config = (env, argv) => {

  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'build'),
      compress: true,
      port: 3000,
      historyApiFallback: true,
      proxy: {
        '/api/**' : {
          target: 'http://localhost:3003',
        }
      }
    },
    devtool: 'source-map',
    performance: {
      maxEntrypointSize: 350000,
      maxAssetSize: 350000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader']
        }
      ]
    }
  }
}

module.exports = config