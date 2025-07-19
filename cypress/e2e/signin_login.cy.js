describe("template spec", () => {
  it("Sucessfully Signin with Credentials", () => {
    cy.visit("http://localhost:3000/status");

    cy.get("input[name='email']").type("honda@gmail.com");
    cy.get("input[name='password']").type("senha123");

    cy.get(":nth-child(2) > form > button").click();

    cy.url().should("include", "/status");
  });

  it("Failed Signin with incorrect Credentials", () => {
    cy.visit("http://localhost:3000/status");

    cy.get("input[name='email']").type("emailtodoerrado@gmail.com");
    cy.get("input[name='password']").type("senhatodaerradatambém");

    cy.get(":nth-child(2) > form > button").click();

    cy.url().should("include", "/api/auth/error");
  });
});
