import { Router } from "express";
import { deleteUser, getUser, updatePassword, updateProfile } from "../controllers/userController.js";
import { appAuthMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.put("/updateProfile", appAuthMiddleware, updateProfile);
router.put("/updatePassword", appAuthMiddleware, updatePassword);
router.delete("/deleteUser", appAuthMiddleware, deleteUser);
router.get("/getUser", appAuthMiddleware, getUser);

export default router;