import { CustomNotFoundError } from "../errors/customNotFoundError.js";
import { getAllMessages, insertMessage } from "../db/queries.js";
import { validationResult, matchedData } from "express-validator";

// Create controller to get homepage, with all messages
async function getMessages(req, res) {
  const messages = await getAllMessages();

  if (!messages.length) {
    throw new CustomNotFoundError("No message yet!");
  }

  res.render("index", { title: "Mini Messageboard", messages: messages });
}

// Create controller to get either a New or Edit Message form
async function getMessageForm(req, res) {
  if (req.path === "/new") {
    return res.render("form", {
      title: "New Message Form",
      formTitle: "Send a message",
      actionRoute: "/new",
      submitText: "Send Message",
      message: { user: "", text: "" },
    });
  }

  const messageId = parseInt(req.params["messageId"]);
  const messages = await getAllMessages();
  const message = messages.find((msg) => msg.id === messageId);

  if (!message) {
    throw new CustomNotFoundError("Message not found !");
  }

  return res.render("form", {
    title: "Edit Message Form",
    formTitle: "Edit your message",
    actionRoute: `/${message.id}/edit`,
    submitText: "Update Message",
    message: message,
  });
}

// Create controller to add a new messasge
async function createMessage(req, res) {
  const errors = validationResult(req); // gather all validation errors

  // Send errors back to user
  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "New Message Form",
      formTitle: "Send a message",
      actionRoute: "/new",
      submitText: "Send Message",
      message: { username: "", message_text: "" },
      errors: errors.array(),
    });
  }

  // extracts only the data that has been successfully validated
  const { messageText, messageUser } = matchedData(req);

  // add message to db
  await insertMessage(messageText, messageUser);

  res.redirect("/");
}

// Create a controller to update a message
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

// Create a method to delete a message
async function deleteMessage(req, res) {
  const messageId = parseInt(req.params["messageId"]);

  const messages = await db.getMessages();

  const messageIndex = messages.findIndex(
    (message) => message.id === messageId,
  );

  if (messageIndex === -1) {
    return res.status(404).send("Message not found");
  }

  messages.splice(messageIndex, 1);
  res.redirect("/");
}

export {
  getMessageForm,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
