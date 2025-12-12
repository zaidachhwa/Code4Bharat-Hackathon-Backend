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


dotenv.config();

const app = express();
connectDB();

const allowedOrigins = [
  process.env.DOMAIN,
  "http://localhost:3000",
  "https://code4bharat.vercel.app", // hardcoded as fallback
];


app.set("trust proxy", 1);
app.use(
  cors({
    origin: (origin, callback) => {
      console.log("Origin received:", origin);

      if (!origin) return callback(null, true); // allow server-to-server

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/test", (req, res) => {
  res.send("Backend Connected☑️");
});

app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRegister);
app.use("/api/admin", adminLogin);

app.use(getAmbassadors);
app.use(ambassadorRegister);
app.use(ambassadorLogin);

app.use(ambassadorStep3);
app.use(ambassadorDashboard);

app.use(ambassadorStep1FormData);
app.use(ambassadorStep2FormData);
app.use(ambassadorCouponCodeUsers);
app.use(imagesOfPromotionAndSeminar);
app.use(ambassadorSteps);
app.use(jwtAuth);

app.use("/api", registration);

app.get("/", (req, res) => {
  res.send("Backend is running☑️");
});

const PORT = process.env.PORT || 5002;
console.log(PORT);
app.listen(PORT, () => {
  console.log(`Server is running at PORT: http://localhost:${PORT}`);
});
