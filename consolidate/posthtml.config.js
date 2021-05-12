module.exports = (ctx) => ({
  plugins: {
    'posthtml-expressions': { locals: ctx.locals },
  },
});
