import {Router } from "express"
import {handleLandingPage,handleTemplatedetails} from "../controllers/openController.js"
const router=Router();
router.get("/",handleLandingPage)
router.get("/template/:template_id",handleTemplatedetails)


export default router