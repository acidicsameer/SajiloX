import User from "../../models/User.model.js"; 
import bcrypt from "bcryptjs";

const UserRegister = async (req, res) => {
  try {
    const { UserName, UserEmail, UserPhoneNumber, UserPassword, Role } = req.body;

    // Validate required fields
    if (!UserName || !UserEmail || !UserPassword) {
      return res.status(400).json({ 
        message: "Name, email and password are required" 
      });
    }

    // Check if user already exists
    const UserFound = await User.findOne({ UserEmail }); 

    if (UserFound) {
      return res.status(409).json({ 
        message: "User already exists with this email" 
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(UserPassword, salt);

    // Create user
    const data = await User.create({
      UserName,
      UserEmail,
      UserPhoneNumber,
      UserPassword: hashedPassword,
      Role,
    });


    res.status(201).json({
      message: "Successfully registered user",
      data
    });

  } catch (error) {
    console.error("Register Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export default UserRegister;