import { Router } from "express";
import UserRegister from "../../controllers/Auth/UserRegister.controller.js";
import UserLogin from "../../controllers/Auth/UserLogin.controller.js";
import UserForgotpw from "../../controllers/Auth/UserForgotpw.controller.js";
import VerifyOtp from "../../controllers/Auth/VerifyOtp.controller.js";
import ConfirmPw from "../../controllers/Auth/ConfirmPw.controller.js";

const UserAuthRoute = Router();
//routes
UserAuthRoute.route("/auth/register").post(UserRegister);
UserAuthRoute.route("/auth/login").post(UserLogin);
UserAuthRoute.route("/auth/forgotpw").post(UserForgotpw);
UserAuthRoute.route("/auth/verifyotp").post(VerifyOtp);
UserAuthRoute.route("/auth/confirmpw").post(ConfirmPw);

export default UserAuthRoute;
