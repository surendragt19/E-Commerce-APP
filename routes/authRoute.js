import express from 'express'
import {loginController, registerController,updateProfileController, orderStatusController, testColntroller, getAllOrdersController, userProtect,forgetController,adminProtect, getOrdersController, contactController, getAllUsers, updateUserRole} from '../controller/authController.js'
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

//orders
router.get("/orders", requireSignInMiddleWear, getOrdersController);

//all orders
router.get("/allOrders", requireSignInMiddleWear, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/orderStatus/:orderId",
    requireSignInMiddleWear,
    isAdmin,
    orderStatusController
  );
//contact 
router.post('/contact',contactController)


//getAllUsers
router.get('/allusers', getAllUsers);
export default router;

//update role
router.put('/update-role', updateUserRole);