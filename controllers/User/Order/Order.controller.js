import Order from "../../../models/Order.model.js";
// this is for user to create ,view , update and delete their order
export const CreateOrder = async (req, res) => {
  const { items, shippingAddress, totalAmount, paymentDetails } = req.body;
  if (
    !items.length > 0 ||
    !shippingAddress ||
    !totalAmount ||
    !paymentDetails
  ) {
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
export const getMyOrder = async (req, res) => {
  const UserId = req.user.id;
  const data = await Order.find({ user: UserId }).populate({
    path: "items.product",
    model: "Product",
    select: "-ProductStockQty -createdAt -updatedAt -__v",
  });
  if (data.length == 0) {
    return res.json({
      message: "failed to fetch order ",
    });
  }
  res.status(200).json({
    message: "success to fetch order ",
    data: data,
  });
};
export const updateMyorder = async (req, res) => {
  const userId = req.user.id;
  const orderId = req.params.id;
  const { items, shippingAddress } = req.body;
  if (items.length == 0 || !shippingAddress) {
    return res.status(404).json({
      message: "Provide items and shipping address",
    });
  }

  const OrderExists = await Order.findById(orderId);
  if (OrderExists.user !== userId) {
    return res.status(404).json({
      message: "You dont have permission to update the order ",
    });
  }
  if (!OrderExists) {
    return res.json({
      message: "No order found on provided id ",
    });
  }
  if (OrderExists.status == "ontheway") {
    return res.json({
      message:
        "Your order cannot be update Now.Your order has been processed already",
    });
  }
  const data = await Order.findByIdAndUpdate(
    orderId,
    {
      items,
      shippingAddress,
    },
    { new: true, runValidators: true }
  );
  res.status(200).json({
    message: "Successfully updated your order.",
    data: data,
  });
};
//delete order means to dlt those order from the db also
export const deleteMyorder = async (req, res) => {
  const orderId = req.params.id;
  const userId = req.user.id;
  const OrderExists = await Order.findById(orderId);
  if (OrderExists.user !== userId) {
    return res.status(404).json({
      message: "You dont have permission to delete the order ",
    });
  }
  if (!OrderExists) {
    return res.json({
      message: "No order found on provided id ",
    });
  }
  if (OrderExists.status != "pending") {
    return res.json({
      message:
        "Your order cannot be delete Now.Your order has been processed already",
    });
  }
  const data = await Order.findByIdAndDelete(orderId);
  if (!data) {
    return res.json({
      message: "failed to delete Order  ",
    });
  }
  res.status(200).json({
    message: "successfully deleted order ",
  });
};
//cancel order means the order means in the db
//cancel means to cancel the order before it is shipped
export const cancelOrder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  // check if order exists
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "No order found with this id",
    });
  }

  // check order ownership
  if (order.user !== userId) {
    return res.status(403).json({
      message: "You don't have permission to cancel this order",
    });
  }

  // allow cancel only if pending
  if (order.orderStatus !== "pending") {
    return res.status(400).json({
      message: "Order cannot be cancelled now",
    });
  }

  // cancel order (soft delete)
  await Order.findByIdAndUpdate(id, {
    orderStatus: "cancelled",
  });

  res.status(200).json({
    message: "Order cancelled successfully",
  });
};
