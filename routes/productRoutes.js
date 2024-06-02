import express, { Router } from "express"
import { isAdmin, requireSignInMiddleWear } from "../middlewears/authMiddlewear.js";
import {createProductController,
    getProductController,
    getSingleProductController,
    productPhotoController,
    deleteProductController,
    updateProductController, 
    productFiltersController,
     productCountController,
      productListController,
      realtedProductController,
      productCategoryController
    ,searchProductController} from '../controller/productController.js'
import formidable from 'express-formidable';
const router=express.Router()

//create product
router.post('/createProduct',requireSignInMiddleWear,isAdmin,formidable(),createProductController)

//get products
router.get("/getProduct", getProductController);

//single product
router.get("/getSingleproduct/:slug", getSingleProductController);

//get photo
router.get("/productPhoto/:pid", productPhotoController);

//delete product
router.delete("/deleteProduct/:pid", deleteProductController);

//update product
router.put("/updateProduct/:pid",requireSignInMiddleWear,isAdmin,formidable(),updateProductController);
//filter product
router.post("/productFilters", productFiltersController);

//product count
router.get("/productCount", productCountController);

//product per page
router.get("/productList/:page", productListController);

//search product
router.get("/search/:keyword", searchProductController);
//releted product
router.get("/relatedProduct/:pid/:cid", realtedProductController);

//category wise product
router.get("/productCategory/:slug", productCategoryController);

export default router;