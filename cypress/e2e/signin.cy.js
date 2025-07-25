/* eslint-disable jest/expect-expect */
describe("Signin login with Credentials", () => {
  before(() => {
    cy.waitForAllServices();
    cy.clearDatabase();
    cy.runPendingMigrations();
    cy.createUser({
      email: "cypress.credentials@gmail.com",
      password: "cypressCredentials",
    });
  });
  it("Sucessfully Signin with correct Credentials", () => {
    cy.visit("/status");
    cy.get("input[name='email']").type("cypress.credentials@gmail.com");
    cy.get("input[name='password']").type("cypressCredentials");

    cy.get(":nth-child(2) > form > button").click();

    cy.url().should("include", "/status");
    cy.visit("api/auth/signout");
    cy.get("form").submit;
  });

  it("Failed Signin with incorrect Credentials", () => {
    cy.visit("/status");
    cy.get("input[name='email']").type("emailtodoerrado@gmail.com");
    cy.get("input[name='password']").type("senhatodaerradatambém");

    cy.get(":nth-child(2) > form > button").click();

    cy.url().should("include", "/api/auth/error");
  });
});

describe("Signin login with OAuth", () => {
  before(() => {
    cy.waitForAllServices();
    cy.clearDatabase();
    cy.runPendingMigrations();
  });
  it("Sucessfully Signin with Github OAuth", () => {
    const username = Cypress.env("GITHUB_USER");
    const password = Cypress.env("GITHUB_PW");
    const loginUrl = Cypress.env("SITE_NAME");
    const cookieName = Cypress.env("COOKIE_NAME");

    cy.session("github-oauth", () => {
      const socialLoginOptions = {
        username,
        password,
        loginUrl,
        cookieName,
        headless: false,
        logs: false,
        isPopup: false,
        loginSelector: `form[action*="github"] button`,
        postLoginSelector: "h1",
      };

      return cy
        .task("GitHubSocialLogin", socialLoginOptions)
        .then(({ cookies }) => {
          cy.then(() => {
            cookies.forEach((cookie) => {
              cy.setCookie(cookie.name, cookie.value, {
                domain: cookie.domain,
                path: cookie.path,
                secure: cookie.secure,
                httpOnly: cookie.httpOnly,
              });
            });
          });
        });
    });

    cy.visit("/status");
    cy.getCookie(cookieName).should("exist");
    cy.url({ timeout: 10000 }).should("include", "/status");
    // cy.visit("api/auth/signout");
    // cy.get("form").submit;
  });
});
