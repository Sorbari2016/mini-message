import * as db from "../routes/indexRouter.js";
import { CustomNotFoundError } from "../errors/customNotFoundError.js";

export async function getMessages() {
  const messages = await db.getMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No message");
  }

  return messages;
}
