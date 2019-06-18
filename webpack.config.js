const isProduction = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const PRODUCTION_PLUGINS = [
  new TerserPlugin(),
];

module.exports = [
  {
    target: 'electron-main',
    externals: [nodeExternals()],
    entry: {
      index: './src/main/index.js'
    },
    output: {
      path: `${__dirname}/main`,
      filename: 'index.js'
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                    },
                    useBuiltIns: 'usage',
                    corejs: 3,
                  }
                ],
                [
                  '@babel/react',
                ]
              ]
            }
          }
        }
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
      ],
    },
    optimization: {
      minimizer: isProduction ? PRODUCTION_PLUGINS : [],
    },
  },
  {
    target: 'electron-renderer',
    entry: {
      index: './src/renderer/index.js'
    },
    output: {
      path: `${__dirname}/renderer`,
      filename: 'index.js'
    },
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'hidden-source-map' : 'source-map',
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      ie: 11,
                    },
                    useBuiltIns: 'usage',
                    corejs: 3,
                  }
                ],
                [
                  '@babel/react',
                ]
              ]
            }
          }
        }
      ],
    },
    resolve: {
      extensions: [
        '.js',
        '.jsx',
      ],
    },
    optimization: {
      minimizer: isProduction ? PRODUCTION_PLUGINS : [],
    },
  }
];
