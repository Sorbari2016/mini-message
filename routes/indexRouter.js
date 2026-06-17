import { Router } from "express";
import {
  getMessages,
  getMessageForm,
  createMessage,
} from "../controller/indexController.js";

// Create index routes
const indexRouter = Router();

indexRouter.get("/", getMessages);
indexRouter.get("/new", getMessageForm);
indexRouter.post("/new", createMessage);

export { indexRouter };
