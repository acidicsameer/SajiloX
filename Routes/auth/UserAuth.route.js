 import { Router } from "express"; 
 import UserLogin from "../../controllers/Auth/UserLogin.controller.js";
 import UserRegister from "../../controllers/Auth/UserRegister.controller.js";
import UserForgotpw from "../../controllers/Auth/UserForgotpw.controller.js";
import VerifyOtp from "../../controllers/Auth/VerifyOtp.controller.js";
import ConfirmPw from "../../controllers/Auth/ConfirmPw.controller.js";
 const AuthRoute= Router()  
 //routes
 AuthRoute.route("/register").post(UserRegister) 
 AuthRoute.route("/login").post(UserLogin) 
 AuthRoute.route("/forgotpw").post(UserForgotpw) 
 AuthRoute.route("/verifyotp").post(VerifyOtp) 
 AuthRoute.route("/confirmpw").post(ConfirmPw) 
  
 export  default AuthRoute
