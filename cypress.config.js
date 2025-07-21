const { defineConfig } = require("cypress");
const { GitHubSocialLogin } = require("cypress-social-logins").plugins;

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    // eslint-disable-next-line no-unused-vars
    setupNodeEvents(on, config) {
      on("task", {
        GitHubSocialLogin: GitHubSocialLogin,
      });
    },
  },
});
