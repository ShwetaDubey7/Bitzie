const express = require("express");
const router = express.Router();
const Order = require("../models/Order"); // Assuming you have an Order model

router.put("/complete-order", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find pending order for this user
    const order = await Order.findOne({ userId, status: "Pending" });

    if (!order) {
      return res.status(404).json({ message: "No pending order found" });
    }

    // Update order status to "Complete"
    order.status = "Complete";
    await order.save();

    res.json({ message: "Order completed successfully" });
  } catch (error) {
    console.error("Error completing order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
