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
  console.log(req.path);

  const message = await (
    await db.getMessages()
  ).find((msg) => msg.id === messageId);

  if (!message) {
    throw new CustomNotFoundError("Message not found !");
  }

  res.render("edit", { message: message });
}

async function updateMessage(req, res) {
  const messageId = parseInt(req.params.messageId);

  const messages = await db.getMessages();

  const messageIndex = messages.findIndex(
    (message) => message.id === messageId,
  );

  if (messageIndex === -1) {
    return res.status(404).send("Message not found");
  }

  const { messageUser, messageText } = req.body;

  messages[messageIndex] = {
    ...messages[messageIndex],
    user: messageUser,
    text: messageText,
  };

  res.redirect("/");
}

export {
  getMessageForm,
  getMessages,
  createMessage,
  getEditMessageForm,
  updateMessage,
};
