import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import { initiatekhaltipayment, verifypidx } from "../../controllers/User/payment/payment.controller.js";
const PaymentRoute = Router();

PaymentRoute.route("/")
.post(isAuth, CatchAsync(initiatekhaltipayment))
PaymentRoute.route("/success")
.get( CatchAsync(verifypidx))






export default PaymentRoute;
