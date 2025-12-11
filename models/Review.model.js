import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReviewSchema = mongoose.Schema(
  {
    UserId: {
      type:Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ProductId: {
      type:Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    Rating: {
      type: Number,
      default: 3,
    },
    ReviewMessage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
export default Review;
