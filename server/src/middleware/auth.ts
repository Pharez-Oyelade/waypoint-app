import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export interface AuthRequest extends Request {
  user?: any;
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    req.user = await User.findById(decoded.id);
    if (!req.user) throw new Error("User not found");
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Token invalid or expired" });
  }
};

// Issue JWT cookie
export const sendTokenCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
  return token;
};
