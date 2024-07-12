import nodemailer from "nodemailer"
import {configDotenv} from "dotenv"

configDotenv();

const sendVerificationCode=(receiver,verificationCode)=>{

    const transporter=nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL_USER ,
      pass:process.env.EMAIL_PASS
    }
})

const mailOptions={
    from:process.env.USER,
   
    to:receiver,
    subject:"verification code from getTemplate.com",
    text:`Click this link to verify your email: http://localhost:3000/verify-email?email=${receiver}&verificationCode=${verificationCode}`
}

transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
        console.log("error sending code",err)
    }
    else{
        console.log("code sent succesfully.")
    }
})
}
export default sendVerificationCode;

