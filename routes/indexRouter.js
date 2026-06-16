import { Router } from "express";
import { getMessages } from "../controller/indexController.js";

// Create index routes
const indexRouter = Router();

indexRouter.get("/", getMessages);

export { indexRouter };
