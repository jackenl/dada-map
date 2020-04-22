'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const port = process.env.port || process.env.npm_config_port || 8080

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  pages: {
    index: {
      title: '哒哒出行'
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
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
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
  }
}