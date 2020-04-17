module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ['*', '!font*', '!letter-spacing'],
      selectorBlackList: ['van-'],
      minPixelValue: 0,
      exclude: /node_modules/i
    }
  }
}