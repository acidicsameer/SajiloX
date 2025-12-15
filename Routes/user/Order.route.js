import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import { CreateOrder, getOrder } from "../../controllers/User/Order/Order.controller.js";
const OrderRoute = Router();

OrderRoute.route("/Orders")
.post(isAuth, CatchAsync(CreateOrder))
.get(isAuth, CatchAsync(getOrder))


export default OrderRoute;
