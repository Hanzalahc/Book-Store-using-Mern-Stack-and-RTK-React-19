import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middlewares/isAuth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/User.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/current-user", isAuthenticated, getCurrentUser);

export default router;
