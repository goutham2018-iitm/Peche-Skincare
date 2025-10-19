/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState, useEffect } from "react";
import {
  ShoppingCart,
  ArrowDown,
  Loader2,
  Mail,
  Phone,
  User,
  X,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface RazorpayButtonProps {
  amount: number;
  productName: string;
}

interface ExchangeRate {
  USDINR: number;
  lastUpdated: string;
  marketStatus: "open" | "closed";
  nextUpdate?: string;
}
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const RazorpayButton: FC<RazorpayButtonProps> = ({ amount, productName }) => {
  const [isLoading, setIsLoading] = useState(false);

   const handleClick = () => {
    const cartData = {
      amount,
      productName,
      timestamp: Date.now(),
    };
    sessionStorage.setItem("cartData", JSON.stringify(cartData));

    // Toast notification for successful cart addition
    toast.success('Item successfully added to cart!', {
      duration: 2000,
      position: 'top-center',
      style: {
        background: '#10b981',
        color: 'white',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
      },
      iconTheme: {
        primary: 'white',
        secondary: '#10b981',
      },
    });

    // Redirect to cart page after a short delay
    setTimeout(() => {
      window.location.href = "/cart";
    }, 1000);
  };

  return (
    <>
      {/* <Toaster position="top-center" /> */}
      <button
        onClick={handleClick}
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
    </>
  );
};

const CartPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", phone: "" });
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  const [loadingRate, setLoadingRate] = useState(true);
  const [rateError, setRateError] = useState(false);
  const [cartData, setCartData] = useState<{
    amount: number;
    productName: string;
  } | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("cartData");

    console.log("Cart Data from sessionStorage:", storedData);

    if (storedData) {
      const parsed = JSON.parse(storedData);
      setCartData(parsed);
    } else {
      console.warn("No cart data found, redirecting to home.");
      window.location.href = "/";
    }
  }, []);

  const fetchExchangeRate = async () => {
    try {
      setLoadingRate(true);
      setRateError(false);

      const response = await fetch(
        "https://api.exchangerate-api.com/v4/latest/USD"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch exchange rate");
      }

      const data = await response.json();
      const usdToInr = data.rates.INR;

      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();

      const marketStatus: "open" | "closed" =
        (day >= 1 && day <= 5) ||
        (day === 0 && hour >= 17) ||
        (day === 6 && hour < 17)
          ? "open"
          : "closed";

      setExchangeRate({
        USDINR: usdToInr,
        lastUpdated: now.toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
        marketStatus,
        nextUpdate: new Date(now.getTime() + 5 * 60000).toLocaleString(
          "en-IN",
          {
            timeZone: "Asia/Kolkata",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
          }
        ),
      });
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
      setRateError(true);

      setExchangeRate({
        USDINR: 83.5,
        lastUpdated: new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
        }),
        marketStatus: "closed",
        nextUpdate: "N/A",
      });
    } finally {
      setLoadingRate(false);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone: string) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
  };

  const validateName = (name: string) => {
    return name.trim().length >= 2;
  };

  const handleSubmit = () => {
    setErrors({ name: "", email: "", phone: "" });

    let hasError = false;
    let errorMessage = "";

    if (!name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      errorMessage = "Please enter your name";
      hasError = true;
    } else if (!validateName(name)) {
      setErrors((prev) => ({
        ...prev,
        name: "Name must be at least 2 characters",
      }));
      errorMessage = "Please enter a valid name (at least 2 characters)";
      hasError = true;
    }

    if (!hasError) {
      if (!email.trim()) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
        errorMessage = "Please enter your email address";
        hasError = true;
      } else if (!validateEmail(email)) {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
        errorMessage = "Please enter a valid email address";
        hasError = true;
      }
    }

    if (!hasError) {
      if (!phone.trim()) {
        setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
        errorMessage = "Please enter your phone number";
        hasError = true;
      } else if (!validatePhone(phone)) {
        setErrors((prev) => ({
          ...prev,
          phone: "Invalid phone number (10 digits, starting with 6-9)",
        }));
        errorMessage =
          "Invalid phone number. Must be 10 digits starting with 6-9";
        hasError = true;
      }
    }

    if (hasError) {
      toast.error(errorMessage, {
        style: {
          background: "#FFF5F5",
          color: "#C53030",
          border: "1px solid #FED7D7",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#C53030",
          secondary: "#FFF5F5",
        },
        duration: 3000,
      });
      return;
    }

    handlePayment();
  };

  const handlePayment = async () => {
    if (!exchangeRate || !cartData) {
      toast.error("Unable to fetch current exchange rate. Please try again.", {
        style: {
          background: "#FFF5F5",
          color: "#C53030",
          border: "1px solid #FED7D7",
          borderRadius: "12px",
          padding: "16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        iconTheme: {
          primary: "#C53030",
          secondary: "#FFF5F5",
        },
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const inrAmount = Math.round(cartData.amount * exchangeRate.USDINR);

      const orderRes = await fetch(`${API_URL}/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: inrAmount,
          currency: "INR",
        }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const order = await orderRes.json();

      const options: any = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "Pêche",
        description: cartData.productName,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            } = response;

            const verifyRes = await fetch(`${API_URL}/verify-payment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                productName: cartData.productName,
                name,
                email,
                phone,
                originalUsdAmount: cartData.amount,
                exchangeRate: exchangeRate?.USDINR,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.dismiss();
              setTimeout(() => {
                toast.success(
                  "Payment successful! 🎉 Check your email for the download link",
                  {
                    id: "payment-success",
                    style: {
                      background:
                        "linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)",
                      color: "#5D3A29",
                      border: "1px solid #F4C7B0",
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      boxShadow: "0 4px 12px rgba(212, 130, 101, 0.15)",
                    },
                    iconTheme: {
                      primary: "#D48265",
                      secondary: "#FFF5F0",
                    },
                    duration: 5000,
                  }
                );

                // Clear cart and redirect after success
                setTimeout(() => {
                  sessionStorage.removeItem("cartData");
                  window.location.href = "/";
                }, 3000);
              }, 200);
            } else {
              toast.dismiss();
              setTimeout(() => {
                toast.error(
                  `Payment verification failed: ${verifyData.message}`,
                  {
                    id: "payment-verification-failed",
                    style: {
                      background: "#FFF5F5",
                      color: "#C53030",
                      border: "1px solid #FED7D7",
                      borderRadius: "12px",
                      padding: "16px",
                      fontSize: "14px",
                      fontWeight: "500",
                    },
                    iconTheme: {
                      primary: "#C53030",
                      secondary: "#FFF5F5",
                    },
                    duration: 4000,
                  }
                );
              }, 200);
            }
          } catch (error) {
            console.error("Verification error:", error);
            toast.dismiss();
            setTimeout(() => {
              toast.error(
                "Payment verification failed. Please contact support with your payment ID",
                {
                  id: "payment-error",
                  style: {
                    background: "#FFF5F5",
                    color: "#C53030",
                    border: "1px solid #FED7D7",
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "14px",
                    fontWeight: "500",
                  },
                  iconTheme: {
                    primary: "#C53030",
                    secondary: "#FFF5F5",
                  },
                  duration: 5000,
                }
              );
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
                id: "payment-cancelled",
                style: {
                  background: "#FFFBEB",
                  color: "#92400E",
                  border: "1px solid #FDE68A",
                  borderRadius: "12px",
                  padding: "16px",
                  fontSize: "14px",
                  fontWeight: "500",
                },
                icon: "⚠️",
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
                  productName: cartData.productName,
                  name,
                  email,
                  phone,
                }),
              });
            } catch (err) {
              console.error("Error recording cancelled payment:", err);
            }
          },
        },
        theme: { color: "#D48265" },
        prefill: {
          name: name,
          email: email,
          contact: phone,
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", async function (response: any) {
        setIsLoading(false);
        console.error("Payment failed:", response.error);

        toast.dismiss();
        setTimeout(() => {
          toast.error(
            `Payment failed: ${response.error.description}. Please try again or contact support`,
            {
              id: "payment-failed",
              style: {
                background: "#FFF5F5",
                color: "#C53030",
                border: "1px solid #FED7D7",
                borderRadius: "12px",
                padding: "16px",
                fontSize: "14px",
                fontWeight: "500",
              },
              iconTheme: {
                primary: "#C53030",
                secondary: "#FFF5F5",
              },
              duration: 5000,
            }
          );
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
              productName: cartData.productName,
              name,
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
        toast.error(
          "Failed to initiate payment. Please check your connection and try again",
          {
            id: "payment-initiation-error",
            style: {
              background: "#FFF5F5",
              color: "#C53030",
              border: "1px solid #FED7D7",
              borderRadius: "12px",
              padding: "16px",
              fontSize: "14px",
              fontWeight: "500",
            },
            iconTheme: {
              primary: "#C53030",
              secondary: "#FFF5F5",
            },
            duration: 4000,
          }
        );
      }, 200);
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem("cartData");
    window.location.href = "/";
  };

  if (!cartData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const inrAmount = exchangeRate ? cartData.amount * exchangeRate.USDINR : null;
  const displayInrAmount = inrAmount ? Math.ceil(inrAmount) : null;

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-xl font-bold text-gray-900">Checkout</h1>
            <div className="w-20"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-xl">
                    <div className="w-16 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-2xl">📖</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {cartData.productName}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Digital Download
                      </p>
                      <p className="text-lg font-bold text-orange-600 mt-2">
                        ${cartData.amount} USD
                      </p>
                    </div>
                  </div>

                  {/* Currency Conversion */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800 text-sm">
                        Currency Conversion
                      </h3>
                      <button
                        onClick={fetchExchangeRate}
                        disabled={loadingRate}
                        className="p-1.5 hover:bg-white rounded-lg transition-colors"
                        title="Refresh rate"
                      >
                        <RefreshCw
                          className={`h-4 w-4 text-gray-600 ${
                            loadingRate ? "animate-spin" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          USD Amount:
                        </span>
                        <span className="font-semibold text-lg">
                          ${cartData.amount} USD
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          INR Amount:
                        </span>
                        <span className="font-bold text-green-700 text-lg">
                          {loadingRate ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Loading...
                            </div>
                          ) : displayInrAmount ? (
                            `₹${displayInrAmount} INR`
                          ) : (
                            "Rate unavailable"
                          )}
                        </span>
                      </div>

                      {exchangeRate && (
                        <div className="text-xs text-gray-500 space-y-1 mt-3 pt-3 border-t border-gray-200">
                          <div className="flex justify-between">
                            <span>Exchange Rate:</span>
                            <span>
                              1 USD = ₹{exchangeRate.USDINR.toFixed(2)} INR
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Market Status:</span>
                            <span
                              className={`font-medium ${
                                exchangeRate.marketStatus === "open"
                                  ? "text-green-600"
                                  : "text-orange-600"
                              }`}
                            >
                              {exchangeRate.marketStatus === "open"
                                ? "🟢 Live"
                                : "🟡 Last Closing"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span>{exchangeRate.lastUpdated} IST</span>
                          </div>
                        </div>
                      )}

                      {rateError && (
                        <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg mt-2">
                          ⚠ Using fallback exchange rate. Actual amount may vary
                          slightly.
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-xs text-blue-800 flex items-start gap-2">
                      <span className="text-base">ℹ️</span>
                      <span>
                        Payment will be securely processed in INR through
                        Razorpay gateway.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Your Details
                </h2>

                <div className="space-y-5">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          setErrors({ ...errors, name: "" });
                        }}
                        placeholder="Enter your full name"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                            : "border-gray-200 focus:border-primary focus:ring-primary/20"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
                        <span>⚠</span> {errors.name}
                      </p>
                    )}
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
                        placeholder="your.email@example.com"
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
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
                    <p className="text-gray-500 text-xs">
                      E-book will be sent to this email
                    </p>
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
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
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
                    disabled={!exchangeRate || loadingRate || isLoading}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : loadingRate ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading Exchange Rate...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Pay {displayInrAmount
                          ? `₹${displayInrAmount}`
                          : "..."}{" "}
                        INR
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    Secure payment powered by Razorpay
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { RazorpayButton, CartPage };
export default RazorpayButton;
