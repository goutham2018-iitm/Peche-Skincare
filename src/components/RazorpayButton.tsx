import React, { FC } from "react";
import { ShoppingCart, ArrowDown } from "lucide-react";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
}

const RazorpayButton: FC<RazorpayButtonProps> = ({ amount, productName }) => {
  const handlePayment = async () => {
    try {
      // 1️⃣ Create order on backend
      const orderRes = await fetch("http://localhost:4000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const order = await orderRes.json();

      // 2️⃣ Razorpay options
      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Pêche",
        description: productName,
        order_id: order.id,
        handler: async (response: any) => {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          const verifyRes = await fetch("http://localhost:4000/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              productName,
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert("✅ Payment Successful!");
          } else {
            alert("❌ Payment Verification Failed!");
          }
        },
        theme: { color: "#2563EB" },
        prefill: {},
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full mt-2 md:mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold py-2 md:py-2.5 text-xs md:text-sm rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2"
    >
      <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
      Download PDF ${amount}
      <ArrowDown className="h-3 w-3 md:h-4 md:w-4 smooth-bounce" />
    </button>
  );
};

export default RazorpayButton;