 import { Router } from "express"; 

import CreateProduct from "../controllers/admin/product/Product.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js"; 
import { upload } from "../middlewares/multer.middleware.js";
 const ProductRoute= Router()    
 //routes
 ProductRoute.route("/product").post(isAuth,isAdmin("Admin"),upload.single("image"),CreateProduct) 

//  ProductRoute.route("/getProduct").post(UserLogin) 
//  ProductRoute.route("/forgotpw").post(UserForgotpw) 
//  ProductRoute.route("/verifyotp").post(VerifyOtp) 
//  ProductRoute.route("/confirmpw").post(ConfirmPw) 
  
 export  default ProductRoute