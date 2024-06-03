import express from 'express'
import {loginController, registerController,updateProfileController, testColntroller, userProtect,forgetController,adminProtect} from '../controller/authController.js'
import { isAdmin, requireSignInMiddleWear } from '../middlewears/authMiddlewear.js';
const router=express.Router();

//Register
router.post('/register',registerController)

//login

router.post('/login',loginController)

//forget

router.post('/forgetPasswd',forgetController)

//test
router.get('/test',requireSignInMiddleWear,isAdmin, testColntroller)

//dahboard user protected route
router.get('/user',requireSignInMiddleWear,userProtect)

//dahboard admin protected route
router.get('/admin',requireSignInMiddleWear, isAdmin, adminProtect)

//update profile
router.put("/profile", requireSignInMiddleWear, updateProfileController);

export default router;