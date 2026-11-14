import "express";
import { Types } from "mongoose";
import { IUser } from "../models/userModel";

declare global {
  namespace Express {
    interface User extends IUser {
      _id: Types.ObjectId;
      id: string;
    }
  }
}
