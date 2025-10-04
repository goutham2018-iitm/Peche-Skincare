import React, { FC, useState } from "react";
import { ShoppingCart, ArrowDown, Loader2, Mail, Phone, X } from "lucide-react";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const RazorpayButton: FC<RazorpayButtonProps> = ({ amount, productName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ email: "", phone: "" });

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[6-9]\d{9}$/; // Indian phone number
    return regex.test(phone);
  };

  const handleSubmit = () => {
    const newErrors = { email: "", phone: "" };
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    
    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "Invalid phone number (10 digits, starting with 6-9)";
    }
    
    setErrors(newErrors);
    
    if (!newErrors.email && !newErrors.phone) {
      setShowModal(false);
      handlePayment();
    }
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    try {
      // 1️⃣ Create order on backend
      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

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
          try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
              response;

            const verifyRes = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                productName,
                email,
                phone,
              }),
            });

            const verifyData = await verifyRes.json();
            
            if (verifyData.success) {
              alert("✅ Payment Successful! Your purchase has been recorded.");
              console.log("Payment saved:", verifyData.data);
              // TODO: Redirect to download page or success page
              // window.location.href = '/download?payment_id=' + razorpay_payment_id;
            } else {
              alert("❌ Payment Verification Failed: " + verifyData.message);
            }
          } catch (error) {
            console.error("Verification error:", error);
            alert("❌ Payment verification failed. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: async () => {
            setIsLoading(false);
            console.log("Payment modal closed by user - Payment cancelled");
            
            // Record cancelled payment
            try {
              await fetch(`${API_URL}/payment-failed`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: order.id,
                  razorpay_payment_id: null,
                  error_code: "cancelled",
                  error_description: "Payment cancelled by user",
                  productName,
                  email,
                  phone,
                }),
              });
            } catch (err) {
              console.error("Error recording cancelled payment:", err);
            }
          }
        },
        theme: { color: "#2563EB" },
        prefill: {
          email: email,
          contact: phone,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', async function (response: any) {
        setIsLoading(false);
        console.error('Payment failed:', response.error);
        alert(`Payment failed: ${response.error.description}`);
        
        // Record failed payment
        try {
          await fetch(`${API_URL}/payment-failed`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.error.metadata.order_id,
              razorpay_payment_id: response.error.metadata.payment_id,
              error_code: response.error.code,
              error_description: response.error.description,
              productName,
              email,
              phone,
            }),
          });
        } catch (err) {
          console.error("Error recording failed payment:", err);
        }
      });

      rzp.open();
    } catch (err) {
      console.error("Payment initiation error:", err);
      alert("Failed to initiate payment. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={isLoading}
        className="w-full mt-2 md:mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold py-2 md:py-2.5 text-xs md:text-sm rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
            Download PDF ${amount}
            <ArrowDown className="h-3 w-3 md:h-4 md:w-4 smooth-bounce" />
          </>
        )}
      </button>

      {/* User Details Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
            
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Enter Your Details
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              We'll use this information to send your purchase confirmation and download link.
            </p>

            <div className="space-y-4">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors({ ...errors, email: "" });
                    }}
                    placeholder="your@email.com"
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 10) {
                        setPhone(value);
                        setErrors({ ...errors, phone: "" });
                      }
                    }}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-6 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorpayButton;