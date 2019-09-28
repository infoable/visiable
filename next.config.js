const withSass = require("@zeit/next-sass");

module.exports = {
  ...withSass({
    cssModules: true
  }),
  devIndicators: {
    autoPrerender: false
  }
};
