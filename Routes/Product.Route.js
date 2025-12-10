import { Router } from "express";

import {
  CreateProduct,
  DeleteProduct,
  getSingleProduct,
  UpdateProduct,
} from "../controllers/admin/product/Product.controller.js";
import isAuth from "../middlewares/isAuth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getProduct } from "../controllers/admin/product/Product.controller.js";
import CatchAsync from "../utils/CatchAsync.js";
const ProductRoute = Router();
//routes
ProductRoute.route("/product")
  .post(
    isAuth,
    isAdmin("Admin"),
    upload.single("image"),
    CatchAsync(CreateProduct)
  )
  .get(CatchAsync(getProduct));
ProductRoute.route("/product/:_id")
  .get(CatchAsync(getSingleProduct))
  .patch(   isAuth,
    isAdmin("Admin"),
    upload.single("image"),
    CatchAsync(UpdateProduct))
  .delete(isAuth, isAdmin("Admin"), CatchAsync(DeleteProduct));

export default ProductRoute;
