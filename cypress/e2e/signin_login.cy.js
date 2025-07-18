describe("template spec", () => {
  it("Signin with sucessfully Credentials", () => {
    cy.visit("http://localhost:3000/status");

    cy.get("input[name='username']").type("Honda");
    cy.get("input[name='email']").type("honda@gmail.com");
    cy.get("input[name='password']").type("senha123");

    cy.get(":nth-child(2) > form > button").click();

    cy.url().should("include", "/status");
  });
});
