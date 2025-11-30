/* eslint-disable no-unreachable */
import User from "../../models/User.model.js";
import SendEmail from "../../utils/SendEmail.js";
 import otpGenerator from "otp-generator";
const UserForgotpw = async (req, res) => {

  const { UserEmail } = req.body;
  if (!UserEmail) {
      return res.status(400).json({
        "message": "UserEmail is required",
      });
    }
  const UserFound = await User.findOne({ UserEmail });
  if (!UserFound) {
    // say user not found
    return res.status(404).json({
      "message": " No users Found ",
    });
}
    // user exists so send otp

    // const otp = Math.floor(Math.random() * 99999);
const otp=otpGenerator.generate(6, { digits:true, specialChars:false, lowerCaseAlphabets:false, upperCaseAlphabets:false})
UserFound.Otp=otp 
await UserFound.save()
    // send this otp to the UsersEmail using nodemailer
    await SendEmail({
      email: UserEmail,
      subject: "Your SajiloX OTP Code",
      text: `Hello,
Your OTP for SajiloX is: ${otp}
 Note:If you did not request this, please ignore this email.
Thank you,
SajiloX Team`
    });
     return  res.json({
      "message": " successfully sent otp", 
    
    });
  
};
export default UserForgotpw
