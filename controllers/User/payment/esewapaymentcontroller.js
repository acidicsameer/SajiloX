import Order from "../../../models/Order.model.js";

export const initiatekhaltipayment = async (req, res) => {
  try {
    // Step 1: Get order details from frontend
    const { orderid, amount } = req.body;

    // Step 2: Validate input
    if (!orderid || !amount) {
      return res.status(400).json({
        message: "Order ID and amount are required",
      });
    }

    // Step 3: Fetch order and user details from database
    const order = await Order.findById(orderid).populate("user");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const username = order.user.UserName;
    const useremail = order.user.UserEmail;
    const phone = order.user.UserPhoneNumber;

    // Step 4: Prepare payment data for Khalti
    const paymentData = {
      success_url: "https://developer.esewa.com.np/success",

      failure_url: "https://developer.esewa.com.np/failure",
      total_amount: amount, // Amount in paisa (1 rupee = 100 paisa)
      transaction_uuid: orderid,
      product_delivery_charge: "0",
      product_service_charge: "0",
      "tax_amount": "10",
      purchase_order_name: `Order-${username}-${orderid}`, // Description of purchase
      website_url: "http://localhost:3000/", // Your website URL
      customer_info: {
        name: username,
        email: useremail,
        phone: phone,
      },
    };

    // Step 5: Send request to Khalti API
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      paymentData,
      {
        headers: {
          Authorization: "key 4180952d995b4bb996a7592bc4840ff8",
        },
      }
    );

    // Step 6: Save pidx (payment ID) in database for verification later
    order.paymentDetails.pidx = response.data.pidx;
    await order.save();

    // Step 7: Redirect user to Khalti payment page
    res.redirect(response.data.payment_url);
  } catch (error) {
    console.error("Payment initiation error:", error);
    res.status(500).json({
      message: "Failed to initiate payment",
    });
  }
};
