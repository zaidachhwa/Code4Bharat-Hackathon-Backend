import express from 'express';
import connectDB from './db/db.js';
import userRegister from './routes/userRegister.route.js';
import ambassadorRegister from './routes/ambassadorRegister.route.js';
import adminLogin from './routes/adminLogin.route.js';
import cors from 'cors';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import getAmbassadors from './routes/getAmbassadors.route.js';
import ambassadorLogin from './routes/ambassadorLogin.route.js';
import ambassadorStep1FormData from './routes/ambassadorStep1FormData.route.js';
import ambassadorStep2FormData from './routes/ambassadorStep2FormData.route.js';
import ambassadorStep3 from './routes/ambassadorStep3.route.js';
import ambassadorDashboard from './routes/ambassadorDashboard.route.js';



const app = express();
dotenv.config();
connectDB();


app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.urlencoded({ extended: false }))
app.use("/uploads", express.static("uploads"));



app.use("/api/users", userRegister);
app.use("/api/admin", adminLogin)

app.use(getAmbassadors);
app.use(ambassadorRegister)
app.use(ambassadorLogin);
app.use(ambassadorStep1FormData);
app.use(ambassadorStep2FormData);
app.use(ambassadorStep3);
app.use(ambassadorDashboard);




app.get("/", (req, res) => {
    res.send("Backend is running☑️");
})



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT: http://localhost:${PORT}`);
})