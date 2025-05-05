// import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator";
// import user from "models/user";
// import password from "models/password";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With invalid 'email'", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "validEmail",
          email: "validEmail@gmail.com",
          password: "senha123",
        }),
      });
      expect(user1Response.status).toBe(201);

      const session1Response = await fetch(
        "http://localhost:3000/api/v1/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "userWithInvalidEmail@gmail.com",
            password: "senha123",
          }),
        },
      );
      expect(session1Response.status).toBe(404);
    });

    test("With invalid 'password'", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "validPassword",
          email: "validPassword@gmail.com",
          password: "validPassword",
        }),
      });
      expect(user1Response.status).toBe(201);

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "validPassword@gmail.com",
          password: "invalidPassword",
        }),
      });
      expect(response.status).toBe(401);
    });

    // // Needs refactor
    // test("With unique and valid data", async () => {
    //   const response = await fetch("http://localhost:3000/api/v1/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: "Honda",
    //       email: "honda@gmail.com",
    //       password: "senha123",
    //     }),
    //   });

    //   expect(response.status).toBe(201);

    //   const responseBody = await response.json();
    //   expect(responseBody).toEqual({
    //     id: responseBody.id,
    //     username: "Honda",
    //     email: "honda@gmail.com",
    //     password: responseBody.password,
    //     created_at: responseBody.created_at,
    //     updated_at: responseBody.updated_at,
    //   });

    //   expect(uuidVersion(responseBody.id)).toBe(4);
    //   expect(Date.parse(responseBody.created_at)).not.toBeNaN();
    //   expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

    //   const userInDatabase = await user.findOneByUsername("Honda");
    //   const correctPasswordMatch = await password.compare(
    //     "senha123",
    //     userInDatabase.password,
    //   );

    //   const incorrectPasswordMatch = await password.compare(
    //     "SenhaErrada",
    //     userInDatabase.password,
    //   );

    //   expect(correctPasswordMatch).toBe(true);
    //   expect(incorrectPasswordMatch).toBe(false);
    // });
  });
});
