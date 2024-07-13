import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
import sendVerificationCode from "../config/configNodemailer.js";
import generataVerificationCode from "../utilities/generateVerificationCode.js";

//loading .env file contents into process.env.
configDotenv();

const handleLogin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email ,verified:true}) .select('+password')
   
    .then((user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err)
            res.status(401).send("Error matching password");
          } else {
            if (result) {
              const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
              res.cookie("token", token, {
                maxAge: 1000 * 86400 * 30,
                secure: true,
                httpOnly: true,
                sameSite: "strict",
              });
              res.status(200).send("Login successfull and token set in cookie");
            } else {
              res.status(401).send("password not matched");
            }
          }
        });
      } else {
        res.status(401).send("user not found");
      }
    })
    .catch((err) => {
      res.status(401).send("Error getting user", err);
    });
};

const handleLogout = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logout succesfully");
};

const handleSignup = (req, res) => {
  const verificationCode = generataVerificationCode();
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user && user.verified) {
        res.status(401).send("Email  already taken!");
      } else {
        if (user) {
          User.findByIdAndDelete(user._id).then(() => {
            bcrypt.hash(password, 10, (err, hashedP) => {
              if (err) {
                res.status(401).send("Error hashing password");
              } else {
                User.create({
                  email,
                  name,
                  password: hashedP,
                  verificationCode,
                })
                  .then((user) => {
                    sendVerificationCode(email, verificationCode);
                    res
                      .status(200)
                      .send(
                        "to complete registration click to url sent to your email"
                      );
                  })
                  .catch((err) => {
                    console.log(err);
                    res.status(401).send("error creating user");
                  });
              }
            });
          });
        }
         else {
            bcrypt.hash(password, 10, (err, hashedP) => {
                if (err) {
                  res.status(401).send("Error hashing password");
                } else {
                  User.create({
                    email,
                    name,
                    password: hashedP,
                    verificationCode,
                  })
                    .then((user) => {
                      sendVerificationCode(email, verificationCode);
                      res
                        .status(200)
                        .send(
                          "to complete registration click to url sent to your email"
                        );
                    })
                    .catch((err) => {
                      console.log(err);
                      res.status(401).send("error creating user");
                    });
                }
              });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(401).send("database error");
    });
};

const handleVerification = (req, res) => {
  const { email, verificationCode } = req.query;

  User.findOneAndUpdate(
    {email, verificationCode },
    {
      $set: { verified: true, verificationCode: null },
    },
    { new: true }
  )
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("token", token, {
        maxAge: 1000 * 86400 * 30,
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      });
      res.status(200).send("email is verified and token is set in cookie");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("error verifying email");
    });
};

export { handleLogin, handleLogout, handleSignup, handleVerification };
