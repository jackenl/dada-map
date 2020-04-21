module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 32,
      propList: ['*', '!font*', '!letter-spacing'],
      selectorBlackList: ['van-'],
      minPixelValue: 2,
      exclude: /node_modules/i
    }
  }
}