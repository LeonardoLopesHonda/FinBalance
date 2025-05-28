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
      const createdUser = await orchestrator.createUser({
        password: "correctPassword",
      });

      const session1Response = await fetch(
        "http://localhost:3000/api/v1/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "incorrectEmail@gmail.com",
            password: createdUser.password,
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
      const createdUser = await orchestrator.createUser({
        email: "correct.email.test@gmail.com",
      });

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: createdUser.email,
          password: "incorrectPassword",
        }),
      });
      expect(response.status).toBe(401);
    });

    test("With incorrect `email` and incorrect `password`", async () => {
      await orchestrator.createUser({});

      const response = await fetch("http://localhost:3000/api/v1/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "incorrect.email@gmail.com",
          password: "incorrect.password",
        }),
      });
      expect(response.status).toBe(401);
    });

    test("With different case `email`", async () => {
      await orchestrator.createUser({
        email: "newValidEmail@gmail.com",
        password: "validPassword",
      });

      const session1Response = await fetch(
        "http://localhost:3000/api/v1/sessions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "NewValidEmail@gmail.com",
            password: "validPassword",
          }),
        },
      );
      expect(session1Response.status).toBe(201);

      const response = await session1Response.json();
      console.log(response);
    });
  });
});
