   
   import User from "../../models/User.model.js"; 
   import bcrypt from "bcryptjs";
   
   
   
   const UserRegister=async(req, res) => {
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
}

 
export default UserRegister