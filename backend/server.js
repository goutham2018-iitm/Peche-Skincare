// backend/server.js
require("dotenv").config();
const express = require("express");
const Razorpay = require("razorpay");
const cors = require("cors");
const bodyParser = require("body-parser");
const crypto = require("crypto");

const app = express();
app.get("/", (req, res) => {
  res.send("🔥 Razorpay backend is running!");
});
app.use(cors());
app.use(bodyParser.json());

// Razorpay keys from .env
const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_ROb0hDBBqIUPIY";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "1In2BKRwCXIDQ0hTPwNI3C6A";

const razorpay = new Razorpay({
  key_id: KEY_ID,
  key_secret: KEY_SECRET,
});

// ---------------- CREATE ORDER ----------------
app.post("/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: "Amount is required" });

    const options = {
      amount: Math.round(Number(amount) * 100), // convert to paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).send("Error creating order");
  }
});

// ---------------- VERIFY PAYMENT ----------------
app.post("/verify-payment", async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, productName } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment parameters" });
    }

    // Verify signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", KEY_SECRET).update(sign).digest("hex");

    if (razorpay_signature !== expectedSign) {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(razorpay_payment_id);
    const { contact: phone, email, name } = payment;

    console.log("✅ Payment verified. User info:");
    console.log({ name, email, phone, productName, paymentId: razorpay_payment_id });

    // TODO: Save this info in your database

    res.json({ success: true, message: "Payment verified and user info saved." });
  } catch (err) {
    console.error("Error verifying payment:", err);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
});

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
