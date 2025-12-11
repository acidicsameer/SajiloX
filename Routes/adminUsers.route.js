import { Router } from "express";
import CatchAsync from "../utils/CatchAsync.js";
import {deleteUser, getUser} from "../controllers/admin/User/User.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";
const AdminUserRoute=Router() 
AdminUserRoute.route("/users").get( isAuth,CatchAsync(getUser) )
AdminUserRoute.route("/users/_id").get( isAuth,CatchAsync(deleteUser) )
export default AdminUserRoute