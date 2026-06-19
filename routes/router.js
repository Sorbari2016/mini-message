import { Router } from "express";
import {
  getMessages,
  getMessageForm,
  createMessage,
  updateMessage,
} from "../controller/controller.js";

// Create index routes
const router = Router();

router.get("/", getMessages);
router.get("/new", getMessageForm);
router.post("/new", createMessage);
router.get("/:messageId", getMessageForm);
router.post("/:messageId", updateMessage);

export { router };
