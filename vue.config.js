'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const title = '哒哒出行'

const port = process.env.port || process.env.npm_config_port || 8090

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  pages: {
    index: {
      // page entry
      entry: 'src/index/main.js',
      // template resource
      template: 'public/index.html',
      // output filename
      filename: 'index.html',
      // html head title
      title: title,
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // config.plugins.delete('preload')
    // config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        // options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
    // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
  }
}