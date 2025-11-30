/* eslint-disable no-undef */
 import User from "../../models/User.model.js";  
 import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
 dotenv.config(); 
 
 const UserLogin=async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;

    if (!UserEmail || !UserPassword) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const UserFound = await User.findOne({ UserEmail });

    if (!UserFound) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatched = await bcrypt.compare(
      UserPassword,
      UserFound.UserPassword
    );

    if (isMatched) {
        //  CREATE TOKEN
    const token = jwt.sign(
      { id: UserFound._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    //  SET COOKIE
    res.cookie("jwttoken", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }); 
      return res.status(200).json({ message: "User logged in successfully" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
} 
export default UserLogin