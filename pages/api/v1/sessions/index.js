import { createRouter } from "next-connect";
import controller from "infra/controller";
import { UnauthorizedError } from "infra/errors.js";
import autheticantion from "models/authentication.js";
import session from "models/session.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;

  const authenticatedUser = await autheticantion.getAuthenticatedUser(
    userInputValues.email,
    userInputValues.password,
  );

  const newSession = await session.create(authenticatedUser);

  return response.status(201).json(newSession);
}
