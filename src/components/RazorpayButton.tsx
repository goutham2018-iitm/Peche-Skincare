import React, { FC, useState } from "react";
import { ShoppingCart, ArrowDown, Loader2, Mail, Phone, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
    // Clear previous errors
    setErrors({ email: "", phone: "" });
    
    let hasError = false;
    let errorMessage = "";

    // Validate email
    if (!email.trim()) {
      setErrors(prev => ({ ...prev, email: "Email is required" }));
      errorMessage = "Please enter your email address";
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: "Invalid email format" }));
      errorMessage = "Please enter a valid email address";
      hasError = true;
    }
    
    // Only check phone if email is valid
    if (!hasError) {
      if (!phone.trim()) {
        setErrors(prev => ({ ...prev, phone: "Phone number is required" }));
        errorMessage = "Please enter your phone number";
        hasError = true;
      } else if (!validatePhone(phone)) {
        setErrors(prev => ({ ...prev, phone: "Invalid phone number (10 digits, starting with 6-9)" }));
        errorMessage = "Invalid phone number. Must be 10 digits starting with 6-9";
        hasError = true;
      }
    }

    // Show single toast error if any validation failed
    if (hasError) {
      toast.error(errorMessage, {
        style: {
          background: '#FFF5F5',
          color: '#C53030',
          border: '1px solid #FED7D7',
          borderRadius: '12px',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        iconTheme: {
          primary: '#C53030',
          secondary: '#FFF5F5',
        },
        duration: 3000,
      });
      return;
    }
    
    // If no errors, proceed with payment
    setShowModal(false);
    handlePayment();
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
              toast.dismiss();
              setTimeout(() => {
                toast.success("Payment successful! 🎉 Check your email for the download link", {
                  id: 'payment-success',
                  style: {
                    background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)',
                    color: '#5D3A29',
                    border: '1px solid #F4C7B0',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                    boxShadow: '0 4px 12px rgba(212, 130, 101, 0.15)',
                  },
                  iconTheme: {
                    primary: '#D48265',
                    secondary: '#FFF5F0',
                  },
                  duration: 5000,
                });
              }, 200);
            } else {
              toast.dismiss();
              setTimeout(() => {
                toast.error(`Payment verification failed: ${verifyData.message}`, {
                  id: 'payment-verification-failed',
                  style: {
                    background: '#FFF5F5',
                    color: '#C53030',
                    border: '1px solid #FED7D7',
                    borderRadius: '12px',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                  },
                  iconTheme: {
                    primary: '#C53030',
                    secondary: '#FFF5F5',
                  },
                  duration: 4000,
                });
              }, 200);
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.dismiss();
            setTimeout(() => {
              toast.error("Payment verification failed. Please contact support with your payment ID", {
                id: 'payment-error',
                style: {
                  background: '#FFF5F5',
                  color: '#C53030',
                  border: '1px solid #FED7D7',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                iconTheme: {
                  primary: '#C53030',
                  secondary: '#FFF5F5',
                },
                duration: 5000,
              });
            }, 200);
          } finally {
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: async () => {
            setIsLoading(false);
            console.log("Payment modal closed by user - Payment cancelled");
            
            toast.dismiss();
            
            setTimeout(() => {
              toast("Payment cancelled. You can try again anytime! 💭", {
                id: 'payment-cancelled',
                style: {
                  background: '#FFFBEB',
                  color: '#92400E',
                  border: '1px solid #FDE68A',
                  borderRadius: '12px',
                  padding: '16px',
                  fontSize: '14px',
                  fontWeight: '500',
                },
                icon: '⚠️',
                duration: 3000,
              });
            }, 100);
            
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
        theme: { color: "#D48265" },
        prefill: {
          email: email,
          contact: phone,
        },
      };

      const rzp = new (window as any).Razorpay(options);
      
      rzp.on('payment.failed', async function (response: any) {
        setIsLoading(false);
        console.error('Payment failed:', response.error);
        
        toast.dismiss();
        setTimeout(() => {
          toast.error(`Payment failed: ${response.error.description}. Please try again or contact support`, {
            id: 'payment-failed',
            style: {
              background: '#FFF5F5',
              color: '#C53030',
              border: '1px solid #FED7D7',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '14px',
              fontWeight: '500',
            },
            iconTheme: {
              primary: '#C53030',
              secondary: '#FFF5F5',
            },
            duration: 5000,
          });
        }, 200);
        
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
      toast.dismiss();
      setTimeout(() => {
        toast.error("Failed to initiate payment. Please check your connection and try again", {
          id: 'payment-initiation-error',
          style: {
            background: '#FFF5F5',
            color: '#C53030',
            border: '1px solid #FED7D7',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
          },
          iconTheme: {
            primary: '#C53030',
            secondary: '#FFF5F5',
          },
          duration: 4000,
        });
      }, 200);
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
            Download PDF ₹{amount}
            <ArrowDown className="h-3 w-3 md:h-4 md:w-4 smooth-bounce" />
          </>
        )}
      </button>

      {/* User Details Modal - Fixed Design */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-gray-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-primary/90 p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">
                  Enter Your Details
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <p className="text-primary-50 text-sm mt-2">
                We'll use this information to send your purchase confirmation and download link.
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-4 border border-primary/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Order Summary</span>
                  <span className="text-lg font-bold text-primary">₹{amount}</span>
                </div>
                <div className="text-xs text-gray-600">
                  <div className="flex justify-between py-1">
                    <span>{productName}</span>
                    <span>₹{amount}</span>
                  </div>
                </div>
              </div>

              {/* Info Message */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800 flex items-start gap-2">
                  <span className="text-base">ℹ️</span>
                  <span>After entering your details, you'll be redirected to Razorpay's secure payment gateway to complete your purchase.</span>
                </p>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
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
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.email 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-gray-200 focus:border-primary focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Input */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
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
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                      errors.phone 
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
                        : "border-gray-200 focus:border-primary focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                    <span>⚠</span> {errors.phone}
                  </p>
                )}
                <p className="text-gray-500 text-xs">
                  Must be 10 digits starting with 6-9
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-5 w-5" />
                Pay ₹{amount}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorpayButton;