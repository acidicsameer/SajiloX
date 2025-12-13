import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import { deleteMyProfile, getMyProfile, UpdateMyPassword, UpdateMyProfile } from "../../controllers/User/Profile/UserProfile.controller.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
const UserProfileRoute = Router();
UserProfileRoute.route("/profile")
.get(isAuth,CatchAsync(getMyProfile)).delete(isAuth,CatchAsync(deleteMyProfile)).patch(isAuth,CatchAsync(UpdateMyProfile))
UserProfileRoute.route("/profile/changepassword")
.patch(isAuth,CatchAsync(UpdateMyPassword))

export default UserProfileRoute;
