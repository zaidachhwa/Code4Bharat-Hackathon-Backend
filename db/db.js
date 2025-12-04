import mongoose from "mongoose";




const connectDB = async() => {
    try {
        mongoose.connect("mongodb://localhost:27017/hackathon")
        console.log("MongoDB Connected☑️")
    } catch (error) {
        console.log("db connection ERROR", error)
    }
}


export default connectDB;