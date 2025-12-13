import bcrypt from "bcryptjs";
import User from "../../../models/User.model.js";

export const getMyProfile = async (req, res) => {
  const UserId = req.user.id;
  const data = await User.findById(UserId);
  if (!data) {
    return res.status(400).json({
      message: "No user exists in this id ",
    });
  }
  res.status(200).json({
    message: "succesfully fetched User",
    data: data,
  });
};
export const deleteMyProfile = async (req, res) => {
  const UserId = req.user.id;
  const data = await User.findByIdAndDelete(UserId);
  if (!data) {
    return res.status(400).json({
      message: "No user exists in this id ",
    });
  }
  res.status(200).json({
    message: "succesfully deleted User",
    data: data,
  });
};
export const UpdateMyProfile = async (req, res) => {
  const UserId = req.user.id;
  const { UserName, UserEmail, UserPhoneNumber } = req.body;
  if (!UserName || !UserEmail || !UserPhoneNumber) {
    return res.json({
      message: "provided all the fields ",
    });
  }
  const data = await User.findByIdAndUpdate(
    UserId,
    {
      UserName,
      UserEmail,
      UserPhoneNumber,
    },
    { runValidators: true, new: true }
  );
  if (!data) {
    return res.status(400).json({
      message: "No user exits ",
    });
  }
  res.status(200).json({
    message: "User Profile Updated Successfully",
    data: null,
  });
};

export const UpdateMyPassword = async (req, res) => {
  const UserId = req.user.id;
  const { OldPassword, NewPassword, ConfirmPassword } = req.body;
  if (!OldPassword || !NewPassword || !ConfirmPassword) {
    return res.json({
      message: "Provided all the fields ",
    });
  }

  if (NewPassword !== ConfirmPassword) {
    return res.json({
      message: "Password must be matched correctly",
    });
  }
  const Userdata = await User.findById(UserId);
  const PrevioushashedPassword = Userdata.UserPassword;
  const isOldPasswordCorrect = bcrypt.compareSync(
    OldPassword,
    PrevioushashedPassword
  );
  if (!isOldPasswordCorrect) {
    return res.json({
      message: "wrong password|| password must be correct",
    });
  }
  Userdata.UserPassword = await bcrypt.hash(NewPassword, 10);
  await Userdata.save(); 
  res.status(200).json({
message:"Successfully changed password "
  })
};
