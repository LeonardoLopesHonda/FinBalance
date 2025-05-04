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
    // Needs refactor
    test("With invalid 'username'", async () => {
      const user1Response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
          email: "user1@gmail.com",
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
            username: "user1",
            token: "tokenGerado",
          }),
        },
      );

      // Because /api/v1/sessions doesn't exists yet
      expect(session1Response.status).toBe(404);
    });

    // // Needs refactor
    // test("With invalid 'email'", async () => {
    //   const user1Response = await fetch("http://localhost:3000/api/v1/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: "email1",
    //       email: "email1@gmail.com",
    //       password: "senha123",
    //     }),
    //   });
    //   const user2Response = await fetch("http://localhost:3000/api/v1/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: "email",
    //       email: "email@gmail.com",
    //       password: "senha123",
    //     }),
    //   });

    //   expect(user1Response.status).toBe(201);
    //   expect(user2Response.status).toBe(201);

    //   const response = await fetch("http://localhost:3000/api/v1/users/user2", {
    //     method: "PATCH",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: "email1@gmail.com",
    //     }),
    //   });
    //   expect(response.status).toBe(400);

    //   const responseBody = await response.json();
    //   expect(responseBody).toEqual({
    //     name: "ValidationError",
    //     message: "O email informado já está sendo utilizado.",
    //     action: "Utilize outro email para realizar esta operação.",
    //     status_code: 400,
    //   });
    // });

    // // Needs refactor
    // test("With invalid 'password'", async () => {
    //   const user1Response = await fetch("http://localhost:3000/api/v1/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: "newPassword1",
    //       email: "newPassword1@gmail.com",
    //       password: "newPassword1",
    //     }),
    //   });
    //   expect(user1Response.status).toBe(201);

    //   const response = await fetch(
    //     "http://localhost:3000/api/v1/users/newPassword1",
    //     {
    //       method: "PATCH",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         password: "newPassword2",
    //       }),
    //     },
    //   );
    //   expect(response.status).toBe(200);

    //   const responseBody = await response.json();
    //   expect(responseBody).toEqual({
    //     id: responseBody.id,
    //     username: "newPassword1",
    //     email: "newPassword1@gmail.com",
    //     password: responseBody.password,
    //     created_at: responseBody.created_at,
    //     updated_at: responseBody.updated_at,
    //   });

    //   const userInDatabase = await user.findOneByUsername("newPassword1");
    //   const correctPasswordMatch = await password.compare(
    //     "newPassword2",
    //     userInDatabase.password,
    //   );

    //   const incorrectPasswordMatch = await password.compare(
    //     "newPassword1",
    //     userInDatabase.password,
    //   );

    //   expect(correctPasswordMatch).toBe(true);
    //   expect(incorrectPasswordMatch).toBe(false);
    // });

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
