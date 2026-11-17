import { Request, Response, NextFunction } from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import User from "../models/userModel";
import { sendTokenCookie } from "../middleware/auth";
import { asyncHandler } from "../utils/asyncHandler";

// Register
export const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing)
    return res.status(409).json({ success: false, message: "Email already in use" });

  const passwordHash = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.create({
    name,
    email,
    passwordHash,
    verificationToken,
    provider: "local",
  });

  // auto-verify in dev
  if (process.env.NODE_ENV === "development") {
    user.emailVerified = true;
    await user.save();
    sendTokenCookie(res, user.id);
    return res.status(201).json({ success: true, user });
  }

  res.status(201).json({ success: true, message: "Check your email to verify" });
});

// Login
export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) return next(err);
    if (!user) return res.status(401).json({ success: false, message: info?.message || "Invalid credentials" });

    sendTokenCookie(res, user.id);
    res.json({ success: true, user });
  })(req, res, next);
};

// Logout
export const logoutUser = (_: Request, res: Response) => {
  res.clearCookie("jwt");
  res.json({ success: true });
};

// Me - route is protected by `protect` middleware
export const getMe = asyncHandler(async (req: Request, res: Response) => {
  res.json({ success: true, user: req.user });
});
