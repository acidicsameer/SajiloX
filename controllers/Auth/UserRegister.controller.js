import User from "../../models/User.model.js";
import bcrypt from "bcryptjs";
const UserRegister = async (req, res) => {
  try {
    console.log("REQ BODY FROM FRONTEND 👉", req.body);

    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Name, email, phone and password are required",
      });
    }

    const UserFound = await User.findOne({ UserEmail: email });
    if (UserFound) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      UserName: name,
      UserEmail: email,
      UserPhoneNumber: phone,
      UserPassword: hashedPassword,
      Role: role || "customer",
    });

    return res.status(201).json({
      message: "Successfully registered user",
      user,
    });
  } catch (error) {
    console.error("REGISTER ERROR 👉", error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
export default UserRegister