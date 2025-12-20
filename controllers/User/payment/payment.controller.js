import axios from "axios";
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
      return_url: "http://localhost:3000/api/payment/success", // Where Khalti will redirect after payment
      purchase_order_id: orderid, // Your unique order ID
      amount: amount, // Amount in paisa (1 rupee = 100 paisa)
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
export const verifypidx = async (req, res) => {
  try {
    // Step 1: Get pidx from URL query parameter
    const pidx = req.query.pidx;

    if (!pidx) {
      return res.redirect("http://localhost:5173/payment-error");
    }

    // Step 2: Verify payment with Khalti API
    const response = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: "key 4180952d995b4bb996a7592bc4840ff8",
        },
      }
    );

    // Step 3: Check if payment was completed
    if (response.data.status === "Completed") {
      // Step 4: Find the order using pidx
      const order = await Order.findOne({ "paymentDetails.pidx": pidx });

      if (!order) {
        return res.redirect("http://localhost:5173/payment-error");
      }

      // Step 5: Update order with payment details
      order.paymentDetails.method = "Khalti";
      order.paymentDetails.status = "paid";
      await order.save();

      // Step 6: Redirect to success page
      res.redirect("http://localhost:5173/payment-success");
    } else {
      // Payment failed or pending
      res.redirect("http://localhost:5173/payment-error");
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    res.redirect("http://localhost:5173/payment-error");
  }
};
