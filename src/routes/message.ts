import { Router } from "express";

import { createMessage, getMessages, getMessage, deleteMessage, updateMessage} from "../controllers/message";

const messageRouter = Router();

messageRouter.post("/send", createMessage)
messageRouter.get("/all", getMessages)
messageRouter.get("/:id",getMessage)
messageRouter.patch("/:id",updateMessage)
messageRouter.delete("/:id",deleteMessage)

export default messageRouter;
