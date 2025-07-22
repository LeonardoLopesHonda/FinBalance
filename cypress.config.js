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
    env: {
      GITHUB_USER: process.env.CYPRESS_TEST_OAUTH_USER,
      GITHUB_PW: process.env.CYPRESS_TEST_OAUTH_PASSWORD,
      COOKIE_NAME: process.env.CYPRESS_TEST_OAUTH_COOKIE_NAME,
      SITE_NAME: process.env.CYPRESS_TEST_OAUTH_SITE_NAME,
    },
  },
});
