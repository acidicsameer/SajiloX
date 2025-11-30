 import { Router } from "express"; 
 import UserLogin from "../controllers/Auth/UserLogin.controller.js";
 import UserRegister from "../controllers/Auth/UserRegister.controller.js";
import UserForgotpw from "../controllers/Auth/UserForgotpw.controller.js";
import VerifyOtp from "../controllers/Auth/VerifyOtp.controller.js";
import ConfirmPw from "../controllers/Auth/ConfirmPw.controller.js";
 const router= Router()  
 //routes
 router.route("/register").post(UserRegister) 
 router.route("/login").post(UserLogin) 
 router.route("/forgotpw").post(UserForgotpw) 
 router.route("/verifyotp").post(VerifyOtp) 
 router.route("/confirmpw").post(ConfirmPw) 
  
 export  default router
