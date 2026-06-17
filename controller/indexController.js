import * as db from "../db.js";
import { CustomNotFoundError } from "../errors/customNotFoundError.js";

async function getMessages(req, res) {
  const messages = await db.getMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No message !");
  }

  res.render("index", { title: "Mini Messageboard", messages: messages });
}

function getMessageForm(req, res) {
  res.render("form", { message: "" });
}

async function createMessage(req, res) {
  const messages = await db.getMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No messages !");
  }

  const { messageText, messageUser } = req.body;

  messages.push({ text: messageText, user: messageUser, added: new Date() });

  res.redirect("/");
}

export { getMessageForm, getMessages, createMessage };
