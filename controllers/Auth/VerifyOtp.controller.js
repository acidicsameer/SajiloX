import User from "../../models/User.model.js";

const VerifyOtp = async (req, res) => {
  const { UserEmail, Otp } = req.body;

  if (!UserEmail || !Otp) {
    return res.status(400).json({ message: "UserEmail and Otp are required" });
  }

  const user = await User.findOne({ UserEmail });
 
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.Otp == (Otp)) { 
   user.Otp=undefined  ;
     await user.save()
     return res.status(200).json({ message: "OTP successfully verified" });
   } 
    
    return res.status(400).json({ message: "Invalid OTP" });

};

export default VerifyOtp;
