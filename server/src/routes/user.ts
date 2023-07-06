import express from "express";
import { signupUser, loginUser, logoutUser } from "../controllers/userController";
import { authenticate } from "../utils/passportjsConfig";

const router = express.Router();

// POST
router.post("/signup", signupUser);
router.post("/login", authenticate, loginUser);
router.post("/logout", logoutUser);

export default router;