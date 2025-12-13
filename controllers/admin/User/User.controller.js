import User from "../../../models/User.model.js";

export const getUser = async (req, res) => {
  const UserId = req.user.id;
  console.log(UserId);
  const data = await User.find();
  if (data.length > 1) {
    return res.status(200).json({
      message: "successfully fetched users",
      data: data,
    });
  }
  res.status(404).json({
    message: "No users get ",
    data: [],
  });
};
export const deleteUser = async (req, res) => {
  const data = await User.findByIdAndDelete(req.params._id);
  if (!data) {
    return res.status(500).json({
      message: "Error deleting User",
    });
  }
  res.status(200).json({
    message: "User deleted successfully",
    data: data,
  });
};
