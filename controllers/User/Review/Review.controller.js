import Review from "../../../models/Review.model.js";
import User from "../../../models/User.model.js";
import Product from "../../../models/Product.model.js";
export const CreateReview = async (req, res) => {
  const { ReviewMessage, Rating } = req.body;
  const UserId = req.user.id;
  if (!ReviewMessage || !Rating) {
    return res.json({
      message: "all required field must be provided ",
    });
  }
  const UserExists = await User.findById(UserId);
  if (!UserExists) {
    return res.status(400).json({
      message: "User doesnot exists",
    });
  }
  console.log(UserId);
  const ProductId = req.params._id;
  const ProductExist = await Product.findById(ProductId);
  if (!ProductExist) {
    return res.status(400).json({
      message: "Product  doesnot exists  ",
    });
  }
  const data = await Review.create({
    UserId,
    ProductId,
    ReviewMessage,
    Rating,
  });
  if (!data) {
    return res.status(400).json({
      message: "Error on adding review ",
    });
  } else {
    res.json({
      message: "Successfully added a review ",
    });
  }
};
export const getReview = async (req, res) => {
  const data = await Review.find().populate({
    path: "UserId",
    select: ["-createdAt", "-updatedAt", "-__v"],
  });
  console.log(data);
  if (data.length == 0) {
    return res.status(400).json({
      message: "no review found",
    });
  }
  res.status(200).json({
    message: "Successfully get review ",
    data: data,
  });
};
export const deleteReview = async (req, res) => {
  const UserId = req.user.id;
  const review = Review.find(req.params._id);
  const ownerIdOfReview = review.UserId;
  if (ownerIdOfReview !== UserId) {
    return res.status(400).json({
      message: "You dont have permission to delete this review",
    });
  }
  const data = await Review.findByIdAndDelete(req.params._id);

  if (!data) {
    return res.status(400).json({
      message: "No data/review exists on provided id",
    });
  }
  res.json({
    message: "review deleted successfully",
  });
};
export const getMyReview = async (req, res) => {
  const UserId = req.user.id;
  const data = await Review.find(UserId);
  if (data.length == 0) {
    return res.status(400).json({
      message: "you havent given review to any producys",
      data: [],
    });
  }
  res.status(200).json({
    message: "succesfully fetched your reviews",
    data: data,
  });
};
