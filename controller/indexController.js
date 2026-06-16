import * as db from "../db.js";
import { CustomNotFoundError } from "../errors/customNotFoundError.js";

export async function getMessages(req, res) {
  const messages = await db.getMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No message !");
  }

  res.render("index", { title: "Mini Messageboard", messages: messages });
}
