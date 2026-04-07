import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "@/models/userModel";
import { profile } from "node:console";

export function initPassport() {
  // ============== Local Strategy ================
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email, provider: "local" }).select(
            "+passwordHash",
          );

          if (!user)
            return done(null, false, { message: "Invalid credentials" });

          const match = await user.comparePassword(password);
          if (!match)
            return done(null, false, { message: "Invalid credentials" });

          if (!user.emailVerified)
            return done(null, false, { message: "Please verify your email" });

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  // ================= Google Strategy ==============
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: "/api/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({
            provider: "google",
            providerId: profile.id,
          });

          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails?.[0].value,
              provider: "google",
              providerId: profile.id,
              avatar: profile.photos?.[0].value,
              emailVerified: true,
            });
          }

          return done(null, user);
        } catch (err) {
          return done(err as Error);
        }
      },
    ),
  );
}
