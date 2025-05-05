import database from "infra/database";
import password from "./password";
import user from "./user";
import { ValidationError } from "infra/errors";

async function create(userInputValues) {
  const currentUser = await user.findOneByEmail(userInputValues.email);
  await validatePassword(userInputValues.password, currentUser.password);
}

async function validatePassword(passedPassword, currentPassword) {
  const isValidPassword = await password.compare(
    passedPassword,
    currentPassword,
  );

  if (!isValidPassword) {
    throw new ValidationError({
      message: "O password informado está incorreto.",
      action: "Utilize o password correto para realizar esta operação.",
      statusCode: 401,
    });
  }
}

const session = {
  create,
};

export default session;
