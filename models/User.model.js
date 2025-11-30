import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = mongoose.Schema(
  {
    UserName: {
      type: String,
      required: [true, "UserName must be provided "],
    },
    UserPhoneNumber: {
      type: String,
      required: [true, "UserPhoneNumber must be provided "],
    },
    UserEmail: {
      type: String, 
    
      required: [true, "Users Email  must be provided "],
    },
    UserPassword: {
      type: String,
      required: [true, "Password must be provided "],
    },
    Role: {
      type: String,
      enum: ["Customer", "Admin"],
      default: "Customer",
    }, 
   Otp: {
type:Number,
    },
    isOtpVerified: {
  type: Boolean,
  default: false,
},
  },
  {
    timeStamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
