import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { configDotenv } from "dotenv"
configDotenv();
const isAuthenticated=(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){

        res.status(401).send("token is not present")
    }
    else{
        jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
            if(err){
                console.log(err)
                res.status(401).send("Invalid Token")
            }
            else{
                User.findById(decoded).then((user)=>{
                    req.user=user;
                    next();
                }).catch((err)=>{
                    res.status(401).send("error getting user ")
                })
            }
        });


    }
}

export default isAuthenticated