import { Router } from "express";
import {handleLogin,handleLogout,handleSignup,handleVerification} from "../controllers/authController.js"
const router=Router();

router.post("/login",handleLogin);
router.post("/logout",handleLogout);
router.post("/signup",handleSignup);

router.get("/verify-email",handleVerification)
export default router