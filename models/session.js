import database from "infra/database";
import crypto from "crypto";

/* 
  This variable calculate the time in miliseconds based on:
  SECONDS * MINUTES * HOURS * DAYS * MILISECONDS
*/
const EXPIRATION_IN_MILISECONDS = 60 * 60 * 1 * 1 * 1000; // 1 hour

async function create(userId) {
  const token = crypto.randomBytes(48).toString("hex");
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILISECONDS);

  const newSession = await runInsertQuery(token, userId, expiresAt);

  return newSession;

  async function runInsertQuery(token, userId, expiresAt) {
    const results = await database.query({
      text: `
        INSERT INTO
          sessions (token, user_id, expires_at)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [token, userId, expiresAt],
    });

    return results.rows[0];
  }
}

function getFormatedDate(dateValue, setterValue) {
  const date = new Date(dateValue);

  date.setMinutes(setterValue);
  date.setSeconds(setterValue);
  date.setMilliseconds(setterValue);

  return date;
}

const session = {
  create,
  EXPIRATION_IN_MILISECONDS,
  getFormatedDate,
};

export default session;
