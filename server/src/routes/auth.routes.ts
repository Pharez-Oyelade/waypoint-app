import { Router } from "express";
import passport from "passport";
import { protect, sendTokenCookie } from "@/middleware/auth";
import rateLimit from "express-rate-limit";
import {
  getMe,
  loginUser,
  logoutUser,
  registerUser,
} from "@/controllers/auth.controller";

const authRouter = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts, try again later",
});

authRouter.post("/register", authLimiter, registerUser);
authRouter.post("/login", authLimiter, loginUser);
authRouter.post("/logout", logoutUser);

authRouter.get("/me", protect, getMe);

// google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
// GET /api/auth/google/callback
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req: any, res) => {
    sendTokenCookie(res, req.user.id);
    res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  },
);

export default authRouter;
