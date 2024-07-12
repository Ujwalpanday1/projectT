import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectDb=async ()=>{
    try{
        const db=await mongoose.connect(process.env.MONGO_URI,{
            dbName:"projectT"
        })
        console.log("Db connected...")
    }
    catch(err){
        console.log("database connection failed",err)
    }
}
export {connectDb}