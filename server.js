import express from "express";
import connectDB from "./db/db.js";
import userRegister from "./routes/userRegister.route.js";
import ambassadorRegister from "./routes/ambassadorRegister.route.js";
import adminLogin from "./routes/adminLogin.route.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import getAmbassadors from "./routes/getAmbassadors.route.js";
import ambassadorLogin from "./routes/ambassadorLogin.route.js";
import ambassadorStep1FormData from "./routes/ambassadorStep1FormData.route.js";
import ambassadorStep2FormData from "./routes/ambassadorStep2FormData.route.js";
import ambassadorStep3 from "./routes/ambassadorStep3.route.js";
import ambassadorDashboard from "./routes/ambassadorDashboard.route.js";
import ambassadorCouponCodeUsers from "./routes/ambassadorCouponCodeUsers.route.js";
import imagesOfPromotionAndSeminar from "./routes/imagesOfPromotionAndSeminar.route.js";
import registration from "./routes/registration.route.js";
import ambassadorSteps from "./routes/ambassadorSteps.route.js";
import jwtAuth from "./routes/jwtAuth.route.js";
import fallback_registration from "./routes/fallbackRegistration.route.js";

import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();
connectDB();

/* ================= RATE LIMITERS ================= */

// 🔹 Normal API limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  message: {
    success: false,
    message: "Too many requests, try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔹 Login limiter (strict)
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Please try later.",
  },
});

// 🔹 Registration limiter
const registerLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 min
  max: 10,
  message: {
    success: false,
    message: "Too many registrations from this IP",
  },
});

/* ================= CORS ================= */

const allowedOrigins = [
  "http://localhost:3000",
  "https://code4bharat.vercel.app",
  "https://www.code4bharat.com",
  "https://code4bharat.com",
];

app.set("trust proxy", true);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* ================= STATIC ================= */

app.use("/uploads", express.static("uploads"));

/* ================= TEST ================= */

app.get("/test", (req, res) => {
  res.send("Backend Connected ☑️");
});

/* ================= ROUTES ================= */

// 🔐 Rate-limited routes
app.use("/api/admin/login", loginLimiter);
app.use("/api/ambassador/login", loginLimiter);
app.use("/api/register", registerLimiter);

// 🌐 General API limiter
app.use("/api", apiLimiter);

// Routes
app.use("/api/users", userRegister);
app.use("/api/admin", adminLogin);

app.use(getAmbassadors);
app.use(ambassadorRegister);
app.use(ambassadorLogin);

app.use(ambassadorStep3);
app.use(ambassadorDashboard);

app.use(ambassadorStep1FormData);
app.use(ambassadorStep2FormData);
app.use("/api", ambassadorCouponCodeUsers);
app.use(imagesOfPromotionAndSeminar);
app.use(ambassadorSteps);
app.use(jwtAuth);

app.use("/api", registration);
app.use("/api", fallback_registration);

/* ================= ROOT ================= */

app.get("/", (req, res) => {
  res.send("Backend is running ☑️");
});

/* ================= SERVER ================= */

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
