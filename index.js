import express from "express";
import { createServer } from "http";
import cookieParser from "cookie-parser";
import { configDotenv } from "dotenv";
import { connectDb } from "./config/configDb.js";
import bodyParser from "body-parser";
import cors from "cors"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/userRoutes.js"
import openRouter from "./routes/openRoutes.js"
import adminRouter from "./routes/adminRoutes.js"


configDotenv();

//creating server 
const app=express();
const server=createServer(app);


//connecting to database 
connectDb();


//setting public view for templates


//using middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(cors())



app.use("/",authRouter);
app.use("/",userRouter);
app.use("/",openRouter);
app.use("/",adminRouter)
;


//listening to server
server.listen(process.env.PORT,()=>{
    console.log(`server is running in Port:${process.env.PORT} ...`)
})