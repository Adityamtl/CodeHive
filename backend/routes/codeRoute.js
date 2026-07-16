import { Router } from "express";
import { appAuthMiddleware } from "../middlewares/auth.middleware.js";
import { getCode, getRemoteCode, reviewCode } from "../controllers/codeController.js";

const router = Router();

router.post("/getCode", appAuthMiddleware, getCode);
router.post("/getRemoteCode", appAuthMiddleware, getRemoteCode);
router.post("/review", appAuthMiddleware, reviewCode);

export default router;
