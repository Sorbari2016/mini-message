import { CustomNotFoundError } from "../errors/customNotFoundError.js";
import {
  getAllMessages,
  getMessageById,
  insertMessage,
  updateUserMessage,
  deleteMessageById,
} from "../db/queries.js";
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
      message: { message_text: "", username: "" },
    });
  }

  const messageId = parseInt(req.params["messageId"]);
  const message = await getMessageById(messageId);

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
      message: {
        //  send back data that passed
        username: req.body.username,
        message_text: req.body.messageText,
      },
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
  const errors = validationResult(req);

  const messageId = parseInt(req.params.messageId);
  const message = await getMessageById(messageId);

  if (!errors.isEmpty()) {
    return res.status(400).render("form", {
      title: "Edit Message Form",
      formTitle: "Edit your message",
      actionRoute: `/${message.id}/edit`,
      submitText: "Update Message",
      message: {
        message_text: req.body.messageText,
        username: req.body.username,
      },
      errors: errors.array(),
    });
  }

  const { messageText, username } = matchedData(req);
  const previousData = {
    message_text: message.message_text,
    username: message.username,
  };

  // update message in db
  await updateUserMessage(
    messageId,
    messageText || previousData.messageText,
    username || previousData.username,
  );

  res.redirect("/");
}

// Create a method to delete a message
async function deleteMessage(req, res) {
  const messageId = parseInt(req.params["messageId"]);

  await deleteMessageById(messageId);
  res.redirect("/");
}

export {
  getMessageForm,
  getMessages,
  createMessage,
  updateMessage,
  deleteMessage,
};
