import mongoose, { Schema } from "mongoose";


const OrderSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
         quantity: {
        type: Number,
        required: true,
        default: 1
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
     
    }
  ],
  status: {
    type: String,
    enum: ["pending", "delivered", "ontheway", "cancelled", "preparation"],
    default: "pending"
  },
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    type: String,
    required: true
  },
  paymentDetails: { 
    pidx:{
      type:String,
    },
    method: { 
      type: String,
      enum: ["COD", "Khalti"],
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "unpaid", "success","paid"],
      default: "pending"
    }
  }
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
export default Order;
