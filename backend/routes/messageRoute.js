import { Router } from "express";
import { getMessages, saveMessage } from "../controllers/messageController.js";
import { appAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/getMessages", appAuthMiddleware, getMessages);
router.post("/saveMessages", appAuthMiddleware, saveMessage);

export default router;