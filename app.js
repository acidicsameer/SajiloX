/* eslint-disable no-undef */
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import dbConn from "./database/dbConn.js";
import User from "./models/User.model.js";
import jwt from "jsonwebtoken";
dotenv.config(); // ✅ FIXED

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT

app.post("/register", async (req, res) => {
  try {
    const { UserName, UserEmail, UserPhoneNumber, UserPassword, Role } = req.body;

    if (!UserEmail || !UserPassword) {
      return res.status(400).json({ message: "Email and Password required" });
    }

    const UserFound = await User.findOne({ UserEmail }); 

    if (UserFound) {
      return res.json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserPassword, salt);

    const data = await User.create({
      UserName,
      UserEmail,
      UserPhoneNumber,
      UserPassword: hashedPassword,
      Role,
    });

    return res.status(201).json({
      message: "Successfully registered user",
      data:data,
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


app.post("/login", async (req, res) => {
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
    console.log(token)
      return res.status(200).json({ message: "User logged in successfully" });
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});


app.listen(port, () => {
  console.log("Server started successfully");
  dbConn();
});
