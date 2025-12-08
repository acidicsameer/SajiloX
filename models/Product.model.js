import mongoose from "mongoose";
import { Schema } from "mongoose";
const ProductSchema = mongoose.Schema(
  {
    ProductName: {
      type: String,
      required: [true, "ProductName is required"],
    },
    ProductDescription: {
      type: String,
      required: [true, "ProductDescription is required"],
    },
    ProductStockQty: {
      type: String,
      required: [true, "Product Stock Quantity is required"],
    },
    ProductPrice: {
      type: String,
      required: [true, "ProductPrice is required"],
    },
    ProductStatus: {
      type: String,
      enum: ["available", "unavailable"],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", ProductSchema);

export default Product;
