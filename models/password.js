import bcryptjs from "bcryptjs";

const PEPPER = process.env.PEPPER;

async function hash(password) {
  const rounds = getNumberOfRounds();
  const spicyPassword = password + PEPPER;
  return await bcryptjs.hash(spicyPassword, rounds);
}

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

async function compare(providedPassword, storedPassword) {
  const spicyPassword = providedPassword + PEPPER;
  return await bcryptjs.compare(spicyPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
