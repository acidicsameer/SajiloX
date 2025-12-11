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
      select: false,
    },
    Role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
    Otp: {
      type: Number,
      select: false,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
