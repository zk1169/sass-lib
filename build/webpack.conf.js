var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
    //var merge = require('webpack-merge')
    //var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var env = 'production';

// var webpackConfig = merge(baseWebpackConfig, {
//   module: {
//     rules: utils.styleLoaders({
//       sourceMap: config.build.productionSourceMap,
//       extract: true
//     })
//   },
//   devtool: config.build.productionSourceMap ? '#source-map' : false,
//   output: {
//     path: config.build.assetsRoot,
//     filename: utils.assetsPath('js/[name].[chunkhash].js'),
//     chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
//   },
//   plugins: [
//     // http://vuejs.github.io/vue-loader/en/workflow/production.html
//     new webpack.DefinePlugin({
//       'process.env': env
//     }),
//     // extract css into its own file
//     new ExtractTextPlugin({
//       filename: utils.assetsPath('css/[name].[contenthash].css')
//     }),
//     // Compress extracted CSS. We are using this plugin so that possible
//     // duplicated CSS from different components can be deduped.
//     new OptimizeCSSPlugin()
//   ]
// })

var webpackConfig = {
    entry: {
        app: './src/style.scss'
    },
    resolve: {
        extensions: ['.scss']
    },
    module: {
        rules: [{
            test: /\.(css|scss)$/,
            //use: ['sass-loader' ]
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        }
        , {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }
        , {
            test: /\.(png|jpeg|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
        }
        ]
    },
    //devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        // new webpack.DefinePlugin({
        //     'process.env': env
        // }),
        // extract css into its own file
        // new ExtractTextPlugin({
        //   filename: utils.assetsPath('css/[name].[contenthash].css')
        // }),
        new ExtractTextPlugin("styles.css"),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin()
    ]
}

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
