import { Router } from "express";

import CatchAsync from "../../utils/CatchAsync.js";
import isAuth from "../../middlewares/isAuth.middleware.js";
import { CreateReview, deleteReview, getMyReview, getReview } from "../../controllers/user/review/Review.controller.js";
const ReviewRoute = Router();
ReviewRoute.route("/review/").get(isAuth, CatchAsync(getMyReview));
ReviewRoute.route("/review/:_id")
  .post(isAuth, CatchAsync(CreateReview))
  .get(CatchAsync(getReview))
  .delete(isAuth, CatchAsync(deleteReview));
export default ReviewRoute;
