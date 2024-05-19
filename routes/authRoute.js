import express from 'express'
import {loginController, registerController, testColntroller, userProtect,forgetController} from '../controller/authController.js'
import { isAdmin, requireSignInMiddleWear } from '../middlewears/authMiddlewear.js';
const router=express.Router();

//Register
router.post('/register',registerController)

//login

router.post('/login',loginController)

//forget

router.post('/forget',forgetController)

//test
router.get('/test',requireSignInMiddleWear,isAdmin, testColntroller)

//dahboard user protected route
router.get('/user',requireSignInMiddleWear,userProtect)





export default router;