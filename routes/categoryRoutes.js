import express from "express";
import { isAdmin, requireSignInMiddleWear } from "../middlewears/authMiddlewear.js";
import { createCategoryController,updateCategoryController,getAllCategoryController,singleCategoryController,deleteCategoryCOntroller} from "../controller/cataegory_Controllers.js";
const router = express.Router();


//router  
//create ctaregoy
router.post('/createCategory',requireSignInMiddleWear,isAdmin,createCategoryController)


//update category
router.put('/updateCategory/:id',requireSignInMiddleWear,isAdmin,updateCategoryController)

// //get category

router.get('/getCategory',getAllCategoryController)

//single category
router.get("/singleCategory/:slug", singleCategoryController);

//delete category
router.delete("/deleteCategory/:id",requireSignInMiddleWear, isAdmin,deleteCategoryCOntroller);
export default router;