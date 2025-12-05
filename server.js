import express from 'express';
import connectDB from './db/db.js';
import userRegister from './routes/userRegister.route.js';
import ambassadorRegister from './routes/ambassadorRegister.route.js';
import adminLogin from './routes/adminLogin.route.js';
import cors from 'cors';
import dotenv from "dotenv";
import getAmbassadors from './routes/getAmbassadors.route.js';
import ambassadorLogin from './routes/ambassadorLogin.route.js';



const app = express();
dotenv.config();
connectDB();


app.use(express.json());
app.use(cors({origin: "http://localhost:3000"}))
app.use(express.urlencoded({extended: false}))
app.use("/uploads", express.static("uploads"));



app.use("/api/users",userRegister);
app.use("/api/ambassador",ambassadorRegister)
app.use("/api/admin",adminLogin)
app.use("/api/ambassadors", getAmbassadors);
app.use("/api/ambassador", ambassadorLogin);


app.get("/",(req,res) => {
    res.send("Backend is running☑️");
})



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server is running at PORT: http://localhost:${PORT}`);
})