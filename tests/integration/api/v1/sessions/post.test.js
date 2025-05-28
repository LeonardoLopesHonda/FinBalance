// import { version as uuidVersion } from "uuid";
// import database from "infra/database";
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
    test("With incorrect `email` but correct `password`", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "incorrectEmail",
          email: "incorrectEmail@gmail.com",
          password: "senhaCorreta",
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
            email: "invalid.email@gmail.com",
            password: "senhaCorreta",
          }),
        },
      );
      expect(session1Response.status).toBe(401);

      const sessionResponseBody = await session1Response.json();

      expect(sessionResponseBody).toEqual({
        name: "UnauthorizedError",
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
        status_code: 401,
      });
    });

    test("With correct `email` but incorrect `password`", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "correctEmail",
          email: "correct.email.test@gmail.com",
          password: "senhaIncorreta",
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

    test("With incorrect `email` and incorrect `password`", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "notRegisteredEmail",
          email: "notRegisteredEmail@gmail.com",
          password: "incorrectPassword",
        }),
      });
      expect(user1Response.status).toBe(201);

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "not.Registered.Email@gmail.com",
          password: "incorrect.password",
        }),
      });
      expect(response.status).toBe(401);
    });

    test("With different case `email`", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "newValidEmail",
          email: "newValidEmail@gmail.com",
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
            email: "NewValidEmail@gmail.com",
            password: "senha123",
          }),
        },
      );
      expect(session1Response.status).toBe(201);

      const response = await session1Response.json();
      console.log(response);
    });
  });
});
