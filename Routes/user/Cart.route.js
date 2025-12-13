import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import { AddToCart, deleteCartItems, getCartItems } from "../../controllers/User/cart/Cart.controller.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
const CartRoute = Router();

CartRoute.route("/cart/:id")
.post(isAuth, CatchAsync(AddToCart))
.delete(isAuth, CatchAsync(deleteCartItems))
CartRoute.route("/cart")
.get(isAuth, CatchAsync(getCartItems))


export default CartRoute;
