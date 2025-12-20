import Order from "../../../models/Order.model.js";
// this is for admin to see all the orders of the users
export const getAllOrder = async (req, res) => {
  const data = await Order.find().populate({
    path: "items.product",
    model: "Product",
  });
  if (data.length == 0) {
    return res.json({
      message: "failed to fetch orders",
    });
  }
  res.status(200).json({
    message: "successfully fetched all the orders of  users  ",
    data: data,
  });
};
export const getSingleOrder = async (req, res) => {
  const id = req.params.id;
  const data = await Order.findById(id);
  if (!data) {
    return res.status(404).json({
      message: "no order found ",
    });
  }
  res.status(200).json({
    message: "successfully fetched order ",

    data: data,
  });
};
export const UpdateOrderStaus = async (req, res) => {
  const id = req.params.id;
  const OrderExists = await Order.findById(id);
  if (!OrderExists) {
    return res.status(404).json({
      message: "no order found ",
    });
  }
  const { status } = req.body;
  if (
    !status ||
    !["pending", "delivered", "ontheway", "canceled", "preparation"].includes(
      status.toLowerCase()
    )
  ) {
    return res.status(400).json({
      message: "invalid status or should be provided",
    });
  }
  const data = await Order.findByIdAndUpdate(
    id,
    {
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!data) {
    return res.json({
      message: "status must be provided",
    });
  } 
  res.status(200).json({
    message:"sucessfully updated status"
  })
};

export const deleteOrder = async (req, res) => {
  const id = req.params.id;
  const OrderExists = await Order.findById(id);
  if (!OrderExists) {
    return res.status(404).json({
      message: "no order found ",
    });
  } 
    const data = await Order.findByIdAndDelete(id)

  res.status(200).json({
    message: "successfully fetched order ",

    data: data,
  });
};