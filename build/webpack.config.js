/*
 * @author alikr
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function(prod){
  const cssLoaders = require('./cssLoaders.js')(prod);
  return {
    devtool:'inline-source-map',
    entry: {
      'index': [resolve('examples/index')]
    },
    output: {
      path: resolve('dist'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[id].js',
      publicPath: '/'
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'index',
        template: resolve('examples/index.html'),
        filename: resolve('dist/index.html'),
        excludeChunks: [],
        scripts: [],
        inject: true,
        hash: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
      }),

      new CopyWebpackPlugin([
        {
          from: resolve('examples/assets/'),
          to: 'data'
        }],
      {
        copyUnmodified: false
      }),

    ],
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          include: [resolve('src')],
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: cssLoaders.vue,
              js: {
                loader: 'babel-loader'
              }
            }
          }
        },
        {
          test: /\.less$/,
          use: cssLoaders.less
        },
        {
          test: /\.(js|es6)$/,
          loader: 'babel-loader',
          exclude: resolve('node_module')
        }, {
          test: /\.css$/,
          use: cssLoaders.css
        }, {
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader',
          options: {
            limit: 10,
            name: 'img/[name]-[hash:8].[ext]',
            publicPath: '../'
          }
        },
        {
          test: /\.((eot|ttf|otf|woff|woff2|svg)(\?.*)?)$/,
          loader: 'url-loader',
          options: {
            limit: 1,
            name: 'fonts/[name]-[hash:4].[ext]'
          }
        },
        {
          test: /\.glsl$/,
          loader: 'shader-loader'
        }]
    },
    resolve: {
      extensions: ['.js', '.es6', '.vue', '.html'],
      alias: {
        'dvg':resolve('src/index.js'),
        // 'dvg':resolve('dist/dvg.js'), // 测试编译文件
      }
    }
  }
}