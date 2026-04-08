import { Router } from "express";
import rateLimit from "express-rate-limit";
import { loginUser, registerUser } from "@/controllers/auth.controller";

const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts, try again later",
});

authRouter.post("/register", authLimiter, registerUser);
authRouter.post("/login", authLimiter, loginUser);

export default authRouter;
