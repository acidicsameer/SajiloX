import { Router } from "express";

import {
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
} from "../../controllers/admin/product/Product.controller.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";
import CatchAsync from "../../utils/CatchAsync.js";
import {
  getProduct,
  getSingleProduct,
  trendingProducts,
} from "../../controllers/globalController/global.controller.js";
import RestrictTo from "../../middlewares/RestrictTo.middleware.js";
const ProductRoute = Router();
//routes
ProductRoute.route("/api/product")
  .post(
    isAuth,
    RestrictTo("Admin"),
    upload.single("image"),
    CatchAsync(CreateProduct)
  )
  .get(CatchAsync(getProduct));
  
ProductRoute.route("/product/:_id")
  .get(CatchAsync(getSingleProduct))
  .patch(
    isAuth,
    RestrictTo("Admin"),
    upload.single("image"),
    CatchAsync(UpdateProduct)
  )
  .delete(isAuth, RestrictTo("Admin"), CatchAsync(DeleteProduct));
ProductRoute.route("/api/product/trending")
.get(CatchAsync(trendingProducts));
export default ProductRoute;
