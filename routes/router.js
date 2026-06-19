import { Router } from "express";
import {
  getMessages,
  getMessageForm,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controller/controllers.js";

// Create index routes
const router = Router();

router.get("/", getMessages);
router.get("/new", getMessageForm);
router.post("/new", createMessage);
router.get("/:messageId/edit", getMessageForm);
router.post("/:messageId/edit", updateMessage);
router.post("/:messageId/delete", deleteMessage);

export { router };
