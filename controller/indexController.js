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
  res.render("form", { title: "Message Form", message: "" });
}

async function createMessage(req, res) {
  const messages = await db.getMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No messages !");
  }

  const { messageText, messageUser } = req.body;

  let lastMessageId = await db.getLastestId();

  messages.push({
    id: ++lastMessageId,
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  console.log(messages);
  res.redirect("/");
}

async function getEditMessageForm(req, res) {
  const messageId = parseInt(req.params.messageId);

  const message = await (
    await db.getMessages()
  ).find((msg) => msg.id === messageId);

  if (!message) {
    throw new CustomNotFoundError("Invalid message !");
  }

  res.render("form", { message: message });
}

export { getMessageForm, getMessages, createMessage, getEditMessageForm };
