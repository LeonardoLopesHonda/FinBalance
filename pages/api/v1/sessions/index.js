import { createRouter } from "next-connect";
import controller from "infra/controller";
import session from "models/session.js";
import user from "models/user";
import { UnauthorizedError } from "infra/errors.js";
import password from "models/password";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  try {
    const storedUser = await user.findOneByEmail(userInputValues.email);
    const correctPasswordMatch = await password.compare(
      userInputValues.password,
      storedUser.password,
    );

    if (!correctPasswordMatch) {
      throw new UnauthorizedError({
        message: "Senha não confere.",
        action: "Verifique se este dado está correto.",
      });
    }
    const newSession = await session.create(storedUser);

    return response.status(201).json(newSession);
  } catch (error) {
    throw new UnauthorizedError({
      message: "Dados de autenticação não conferem.",
      action: "Verifique se os dados enviados estão corretos.",
    });
  }
  // await session.create(userInputValues);
  // return response.status(201).json(newSession);
}
