import { Router } from "express";
import { CreateReview, getReview ,deleteReview} from "../controllers/admin/product/Review.controller.js";
import CatchAsync from "../utils/CatchAsync.js";
import isAuth from "../middlewares/isAuth.middleware.js";
const ReviewRoute=Router() 
ReviewRoute.route("/review/:_id").post(isAuth,CatchAsync(CreateReview) ).get(CatchAsync(getReview)).delete(isAuth,CatchAsync(deleteReview) )
export default ReviewRoute