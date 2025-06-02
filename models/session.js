import database from "infra/database";
import crypto from "crypto";

async function create({ id, username }) {
  const newSession = await runInsertQuery(id);

  return { username, ...newSession };

  async function runInsertQuery(userId) {
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
      values: [token, userId, expiresAt],
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
