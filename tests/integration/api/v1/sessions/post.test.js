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
  });
});
