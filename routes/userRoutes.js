import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {handleUser,handleUserProfile,handlePurchase} from "../controllers/userController.js"
const router=Router();

router.get("/user",isAuthenticated,handleUser)
router.get("/user/profile",isAuthenticated,handleUserProfile)
router.get("/template/purchase/:template_id",isAuthenticated,handlePurchase)


export default router