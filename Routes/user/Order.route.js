import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import { cancelOrder, CreateOrder, deleteMyorder, getMyOrder, updateMyorder } from "../../controllers/User/Order/Order.controller.js";
const OrderRoute = Router();

OrderRoute.route("/Orders")
.post(isAuth, CatchAsync(CreateOrder))
.get(isAuth, CatchAsync(getMyOrder))

// cancel order is done by patch bcz while doing cancel just status is changed so to keep latest status
// in db we use patch 
OrderRoute.route("/cancel")
.patch(isAuth, CatchAsync(cancelOrder))


OrderRoute.route("/Orders/:id")
.patch(isAuth, CatchAsync(updateMyorder))
.delete(isAuth, CatchAsync(deleteMyorder))

export default OrderRoute;
