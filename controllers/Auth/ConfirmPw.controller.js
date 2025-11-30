import User from "../../models/User.model.js";
import bcrypt from "bcryptjs";

const ConfirmPw = async (req, res) => {
  const { UserEmail, UserPassword } = req.body;
  const user = await User.findOne({ UserEmail });
  if (!user) {
    return res.json({
      message: "no user found   on provided email  ",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserPassword, salt);
    user.UserPassword = hashedPassword;
    await user.save();
    return res.json({
      message: "password reset successfully",
    });
  }
};
export default ConfirmPw;
