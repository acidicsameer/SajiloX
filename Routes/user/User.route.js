import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import { deleteMyProfile, getMyProfile, UpdateMyPassword, UpdateMyProfile } from "../../controllers/User/Profile/UserProfile.controller.js";
const UserProfileRoute = Router();
UserProfileRoute.route("/profile")
.get(CatchAsync(getMyProfile)).delete(CatchAsync(deleteMyProfile)).patch(CatchAsync(UpdateMyProfile))
UserProfileRoute.route("/profile/changepassword")
.patch(CatchAsync(UpdateMyPassword))

export default UserProfileRoute;
