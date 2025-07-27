// Load .env config to run db queries
const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

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
    GITHUB_USER: process.env.CYPRESS_GITHUB_USER,
    GITHUB_PASSWORD: process.env.CYPRESS_GITHUB_PASSWORD,
    COOKIE_NAME: process.env.CYPRESS_COOKIE_NAME,
    SITE_NAME: process.env.CYPRESS_SITE_NAME,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    chromeWebSecurity: false,
    supportFile: "cypress/support/e2e.js",
    setupNodeEvents: async (on, config) => {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" || browser.name === "chromium") {
          launchOptions.args.push("--no-sandbox");
          launchOptions.args.push("--disable-gpu");
          launchOptions.args.push("--disable-dev-shm-usage");
        }
        return launchOptions;
      }),
        on("task", {
          GitHubSocialLogin: GitHubSocialLogin,
          async createUser(userData) {
            return await orchestrator.createUser(userData);
          },
          async waitForAllServices() {
            await orchestrator.waitForAllServices();
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
