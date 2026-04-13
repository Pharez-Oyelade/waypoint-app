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

import dns from "node:dns";
import authRouter from "./routes/auth.routes";
import tripRouter from "./routes/trips.routes";
import activityRouter from "./routes/activities.routes";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Socket.IO
// TODO: expand
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
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =============== Passport ====================
initPassport();

// ================= Routes ====================
app.use("/api/auth", authRouter);
app.use("/api/trips", tripRouter);
app.use("/api", activityRouter);
app.use("/api/activities", activityRouter);

// ============ HEalth check ====================
app.get("/health", (_, res) => res.json({ status: "ok" }));

// ================= Error Handling ==================
app.use((err: any, req: any, res: any, next: any) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= Start ===================
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  httpServer.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`),
  );
});
