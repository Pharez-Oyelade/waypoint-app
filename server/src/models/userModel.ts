import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;
  provider: "local" | "google";
  providerId?: string;
  avatar?: string;
  homeCountry?: string;
  defaultCurrency: string;
  travelStyle: string[];
  emailVerified: boolean;
  verificationToken?: string;
  comparePassword(candidate: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    providerId: { type: String },
    avatar: { type: String },
    homeCountry: { type: String },
    defaultCurrency: { type: String, default: "USD" },
    travelStyle: [{ type: String }],
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
  },
  { timestamps: true },
);

// never return password hash
UserSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.passwordHash;
    return ret;
  },
});

UserSchema.methods.comparePassword = function (candidate: string) {
  return bcrypt.compare(candidate, this.passwordHash);
};

export default mongoose.model<IUser>("UserModel", UserSchema);
