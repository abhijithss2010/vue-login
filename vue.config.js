// vue.config.js
module.exports = {
  // options...
  publicPath: "/vue-login/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/mixins/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
};
