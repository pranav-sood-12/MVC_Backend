import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/task.js"
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

config ({
    path : "./data/config.env",
})

const router = express.Router();
//using middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET", "POST" , "PUT" ,"DELETE"],
    credentials : true
}))
app.use(userRouter);
app.use(taskRouter);

app.get("/", (req,res) => {
    res.send("Nice working");
});