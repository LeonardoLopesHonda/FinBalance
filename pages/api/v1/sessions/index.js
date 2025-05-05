import { createRouter } from "next-connect";
import controller from "infra/controller";
import session from "models/session.js";

const router = createRouter();

router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function postHandler(request, response) {
  const userInputValues = request.body;
  const newSession = await session.create(userInputValues);
  // return response.status(201).json(newSession);

  return response.status(201).json({});
}
