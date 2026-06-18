import { Router } from "express";
import {
  getMessages,
  getMessageForm,
  createMessage,
  getEditMessageForm,
  updateMessage,
} from "../controller/indexController.js";

// Create index routes
const indexRouter = Router();

indexRouter.get("/", getMessages);
indexRouter.get("/new", getMessageForm);
indexRouter.post("/new", createMessage);
indexRouter.get("/:messageId", getEditMessageForm);
indexRouter.post("/:messageId", updateMessage);

export { indexRouter };
