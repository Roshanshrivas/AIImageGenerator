import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

//Error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong!";
    return res.status(status).json({
        success:false,
        status,
        message,
    });
});


app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);


//Default handler
app.get("/", async (req, res) => {
    res.status(200).json({
        message: "Hello Developers",
    });
});


//function to connect mongodb
const connectDB = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
        console.error("Failed to connect");
        console.error(err);
    });
}



//funcation to start the server
const startServer = async (req, res) => {
    try {
        connectDB();
        app.listen(8080, () => console.log("Server started at Port 8080"))
    } catch (error) {
        console.log(error);
    }
};

startServer();















