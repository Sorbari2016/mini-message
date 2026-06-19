import { Router } from "express";
import {
  getMessages,
  getMessageForm,
  createMessage,
  updateMessage,
} from "../controller/controllers.js";

// Create index routes
const router = Router();

router.get("/", getMessages);
router.get("/new", getMessageForm);
router.post("/new", createMessage);
router.get("/:messageId/edit", getMessageForm);
router.post("/:messageId/edit", updateMessage);

export { router };
