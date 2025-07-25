// Load .env config to run db queries
const dotenv = require("dotenv");

if (process.env.NODE_ENV === "development") {
  dotenv.config({
    path: ".env.development",
  });
}

const { defineConfig } = require("cypress");

// Uses Babel to transpile the ESM files such as orchestrator to CommonJS
require("@babel/register")({
  extensions: [".js"],
  ignore: [/node_modules/],
});

// Handle paths with ESM files to prepare for CommonJS env
require("./register-aliases");

const { GitHubSocialLogin } = require("cypress-social-logins").plugins;

// .default is used to recognize ESM exports
const orchestrator = require("./tests/orchestrator.js").default;

module.exports = defineConfig({
  env: {
    GITHUB_USER: process.env.GITHUB_USER,
    GITHUB_PW: process.env.GITHUB_PW,
    COOKIE_NAME: process.env.COOKIE_NAME,
    SITE_NAME: process.env.SITE_NAME,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents: async (on, config) => {
      on("task", {
        GitHubSocialLogin: GitHubSocialLogin,
        async createUser(userData) {
          return await orchestrator.createUser(userData);
        },
        async waitForAllServices() {
          await orchestrator.waitForAllServices();
          console.log("OAuth user:", process.env.GITHUB_USER);
          console.log("OAuth password:", process.env.GITHUB_PW);
          return null;
        },
        async clearDatabase() {
          await orchestrator.clearDatabase();
          return null;
        },
        async runPendingMigrations() {
          await orchestrator.runPendingMigrations();
          return null;
        },
      });
      return config;
    },
  },
});
