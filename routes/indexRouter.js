import { Router } from "express";
import { getMessages, getMessageForm } from "../controller/indexController.js";

// Create index routes
const indexRouter = Router();

indexRouter.get("/", getMessages);
indexRouter.get("/new", getMessageForm);

export { indexRouter };
