import { Router } from "express";
import UserLogin from "../../controllers/Auth/UserLogin.controller.js"; 
import UserRegister from "../../controllers/Auth/UserRegister.controller.js"; 
import UserForgotpw from "../../controllers/Auth/UserLogin.controller.js"; 
import VerifyOtp from "../../controllers/Auth/UserLogin.controller.js"; 
import ConfirmPw from "../../controllers/Auth/UserLogin.controller.js"; 

const UserAuthRoute = Router();
//routes
UserAuthRoute.route("/register").post(UserRegister);
UserAuthRoute.route("/login").post(UserLogin);
UserAuthRoute.route("/forgotpw").post(UserForgotpw);
UserAuthRoute.route("/verifyotp").post(VerifyOtp);
UserAuthRoute.route("/confirmpw").post(ConfirmPw);

export default UserAuthRoute;
