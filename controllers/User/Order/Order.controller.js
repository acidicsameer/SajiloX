import Order from "../../../models/Order.model.js";
// this is for user to create and view their order detail  
export const CreateOrder = async (req, res) => {
  const { items, shippingAddress, totalAmount, paymentDetails } = req.body;
  if (!items.length > 0 || !shippingAddress || !totalAmount || !paymentDetails) {
    return res.json({
      message:
        "Provide items , shippingAddress,totalAmount and Paymentdetails ",
    });
  }
  const UserId = req.user.id;
  if (!UserId) {
    return res.status(400).json({
      message: "Invalid request: User ID not provided",
    });
  }
  const data = await Order.create({
    user: UserId,
    items,
    shippingAddress,
    paymentDetails,
    totalAmount,
  });
  if (!data) {
    return res.json({
      message: "failed to create a order ",
    });
  }
  res.status(200).json({
    message: "success to create a order ",
    data: data,
  });
};
export const getOrder = async (req, res) => {
  const UserId = req.user.id;
  const data = await Order.find({user:UserId}).populate({
    path: "items.product",
    model: "Product", 
    select:"-ProductStockQty -createdAt -updatedAt -__v"
  }); 
  if (data.length==0) {
    return res.json({
      message: "failed to fetch order ",
    });
  }
  res.status(200).json({
    message: "success to fetch order ",
    data: data,
  });
};
