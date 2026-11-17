/// <reference path="./types/express.d.ts" />
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { initPassport } from "./config/passport";

import authRouter from "./routes/auth.routes";
import tripRouter from "./routes/trips.routes";
import activityRouter from "./routes/activities.routes";

import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

// Socket.IO
// TODO: expand — add authentication on handshake and event handlers
export const io = new Server(httpServer, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});

// =================== Middleware ====================
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  }),
);
// Use 'combined' format in production for richer logs
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =============== Passport ====================
initPassport();

// ================= Routes ====================
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api", activityRouter); // activity routes are prefixed with /trips/:tripId/...

// ============ Health check ====================
app.get("/health", (_, res) => res.json({ status: "ok" }));

// ================= Global Error Handler ==================
app.use(
  (
    err: Error & { statusCode?: number },
    req: express.Request,
    res: express.Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: express.NextFunction,
  ) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    if (process.env.NODE_ENV !== "production") {
      console.error(`[${req.method}] ${req.path} — ${status}: ${message}`);
    }

    res.status(status).json({ success: false, message });
  },
);

// ================= Start ===================
const PORT = process.env.PORT || 5000;
connectDB()
  .then(() => {
    httpServer.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`),
    );
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
    process.exit(1);
  });
