import database from "infra/database";
import crypto from "crypto";

async function create(user) {
  const newSession = await runInsertQuery(user);
  return newSession;

  async function runInsertQuery(user) {
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = getExpirationDate();

    const results = await database.query({
      text: `
        INSERT INTO
          sessions (session_token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [token, user.id, expiresAt],
    });

    return results.rows[0];
  }

  function getExpirationDate() {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    return now;
  }
}

const session = {
  create,
};

export default session;
