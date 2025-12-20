import { Router } from "express";
import CatchAsync from "../../utils/CatchAsync.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import {
  deleteOrder,
  getAllOrder,
  getSingleOrder,
  UpdateOrderStaus,
} from "../../controllers/admin/Order/Order.controller.js";
import RestrictTo from "../../middlewares/RestrictTo.middleware.js";

const AdminOrderRoute = Router();
AdminOrderRoute.route("/").get(isAuth, CatchAsync(getAllOrder));
AdminOrderRoute.route("/:id")
  .get(isAuth, RestrictTo("Admin"), CatchAsync(getSingleOrder))
  .get(isAuth, RestrictTo("Admin"), CatchAsync(UpdateOrderStaus))
  .get(isAuth, RestrictTo("Admin"), CatchAsync(deleteOrder));
export default AdminOrderRoute;
