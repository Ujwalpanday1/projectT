import {Router} from "express"
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {handleAdminAddTemplate} from "../controllers/adminController.js"
import uploads from "../middlewares/upload.js";

const router=Router();
router.post("/admin/addTemplate",isAuthenticated,isAdmin,uploads.single("file"),handleAdminAddTemplate)

export default router