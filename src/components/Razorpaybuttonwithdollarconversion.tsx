// import React, { FC, useState, useEffect } from "react";
// import { ShoppingCart, ArrowDown, Loader2, Mail, Phone, X, RefreshCw } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast";

// interface RazorpayButtonProps {
//   amount: number; // USD amount
//   productName: string;
// }

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// // Interface for exchange rate data
// interface ExchangeRate {
//   USDINR: number;
//   lastUpdated: string;
//   marketStatus: 'open' | 'closed';
//   nextUpdate?: string;
// }

// const RazorpayButton: FC<RazorpayButtonProps> = ({ amount, productName }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [errors, setErrors] = useState({ email: "", phone: "" });
//   const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
//   const [loadingRate, setLoadingRate] = useState(true);
//   const [rateError, setRateError] = useState(false);

//   // Fetch live USD to INR exchange rate
//   const fetchExchangeRate = async () => {
//     try {
//       setLoadingRate(true);
//       setRateError(false);
      
//       // Using a free forex API (you can replace with your preferred API)
//       const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      
//       if (!response.ok) {
//         throw new Error('Failed to fetch exchange rate');
//       }
      
//       const data = await response.json();
//       const usdToInr = data.rates.INR;
      
//       // Determine market status (simplified - Forex markets are open 24/5)
//       const now = new Date();
//       const day = now.getDay(); // 0 = Sunday, 6 = Saturday
//       const hour = now.getHours();
      
//       const marketStatus: 'open' | 'closed' = 
//         (day >= 1 && day <= 5) || (day === 0 && hour >= 17) || (day === 6 && hour < 17) 
//           ? 'open' 
//           : 'closed';
      
//       setExchangeRate({
//         USDINR: usdToInr,
//         lastUpdated: now.toLocaleString('en-IN', {
//           timeZone: 'Asia/Kolkata',
//           hour12: true,
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         marketStatus,
//         nextUpdate: new Date(now.getTime() + 5 * 60000).toLocaleString('en-IN', {
//           timeZone: 'Asia/Kolkata',
//           hour12: true,
//           hour: '2-digit',
//           minute: '2-digit'
//         })
//       });
      
//     } catch (error) {
//       console.error('Error fetching exchange rate:', error);
//       setRateError(true);
      
//       // Fallback to a static rate if API fails
//       setExchangeRate({
//         USDINR: 83.50, // Fallback rate
//         lastUpdated: new Date().toLocaleString('en-IN', {
//           timeZone: 'Asia/Kolkata',
//           hour12: true
//         }),
//         marketStatus: 'closed',
//         nextUpdate: 'N/A'
//       });
//     } finally {
//       setLoadingRate(false);
//     }
//   };

//   useEffect(() => {
//     fetchExchangeRate();
    
//     // Refresh rate every 5 minutes
//     const interval = setInterval(fetchExchangeRate, 5 * 60 * 1000);
    
//     return () => clearInterval(interval);
//   }, []);

//   const validateEmail = (email: string) => {
//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return regex.test(email);
//   };

//   const validatePhone = (phone: string) => {
//     const regex = /^[6-9]\d{9}$/; // Indian phone number
//     return regex.test(phone);
//   };

//   const handleSubmit = () => {
//     // Clear previous errors
//     setErrors({ email: "", phone: "" });
    
//     let hasError = false;
//     let errorMessage = "";

//     // Validate email
//     if (!email.trim()) {
//       setErrors(prev => ({ ...prev, email: "Email is required" }));
//       errorMessage = "Please enter your email address";
//       hasError = true;
//     } else if (!validateEmail(email)) {
//       setErrors(prev => ({ ...prev, email: "Invalid email format" }));
//       errorMessage = "Please enter a valid email address";
//       hasError = true;
//     }
    
//     // Only check phone if email is valid
//     if (!hasError) {
//       if (!phone.trim()) {
//         setErrors(prev => ({ ...prev, phone: "Phone number is required" }));
//         errorMessage = "Please enter your phone number";
//         hasError = true;
//       } else if (!validatePhone(phone)) {
//         setErrors(prev => ({ ...prev, phone: "Invalid phone number (10 digits, starting with 6-9)" }));
//         errorMessage = "Invalid phone number. Must be 10 digits starting with 6-9";
//         hasError = true;
//       }
//     }

//     // Show single toast error if any validation failed
//     if (hasError) {
//       toast.error(errorMessage, {
//         style: {
//           background: '#FFF5F5',
//           color: '#C53030',
//           border: '1px solid #FED7D7',
//           borderRadius: '12px',
//           padding: '16px',
//           fontSize: '14px',
//           fontWeight: '500',
//         },
//         iconTheme: {
//           primary: '#C53030',
//           secondary: '#FFF5F5',
//         },
//         duration: 3000,
//       });
//       return;
//     }
    
//     // If no errors, proceed with payment
//     setShowModal(false);
//     handlePayment();
//   };

//   const handlePayment = async () => {
//     if (!exchangeRate) {
//       toast.error("Unable to fetch current exchange rate. Please try again.", {
//         style: {
//           background: '#FFF5F5',
//           color: '#C53030',
//           border: '1px solid #FED7D7',
//           borderRadius: '12px',
//           padding: '16px',
//           fontSize: '14px',
//           fontWeight: '500',
//         },
//         iconTheme: {
//           primary: '#C53030',
//           secondary: '#FFF5F5',
//         },
//         duration: 4000,
//       });
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       // Convert USD to INR for Razorpay (amount in paise)
//       const inrAmount = Math.round(amount * exchangeRate.USDINR * 100); // Convert to paise
      
//       // 1️⃣ Create order on backend
//       const orderRes = await fetch(`${API_URL}/create-order`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ 
//           amount: inrAmount, // Send INR amount in paise
//           currency: "INR" // Force INR currency
//         }),
//       });

//       if (!orderRes.ok) {
//         throw new Error("Failed to create order");
//       }

//       const order = await orderRes.json();

//       // 2️⃣ Razorpay options
//       const options: any = {
//         key: import.meta.env.VITE_RAZORPAY_KEY,
//         amount: order.amount,
//         currency: "INR", // Force INR currency
//         name: "Pêche",
//         description: productName,
//         order_id: order.id,
//         handler: async (response: any) => {
//           try {
//             const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
//               response;

//             const verifyRes = await fetch(`${API_URL}/verify-payment`, {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify({
//                 razorpay_payment_id,
//                 razorpay_order_id,
//                 razorpay_signature,
//                 productName,
//                 email,
//                 phone,
//                 originalUsdAmount: amount,
//                 exchangeRate: exchangeRate?.USDINR
//               }),
//             });

//             const verifyData = await verifyRes.json();
            
//             if (verifyData.success) {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.success("Payment successful! 🎉 Check your email for the download link", {
//                   id: 'payment-success',
//                   style: {
//                     background: 'linear-gradient(135deg, #FFF5F0 0%, #FFE8DC 100%)',
//                     color: '#5D3A29',
//                     border: '1px solid #F4C7B0',
//                     borderRadius: '12px',
//                     padding: '16px',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                     boxShadow: '0 4px 12px rgba(212, 130, 101, 0.15)',
//                   },
//                   iconTheme: {
//                     primary: '#D48265',
//                     secondary: '#FFF5F0',
//                   },
//                   duration: 5000,
//                 });
//               }, 200);
//             } else {
//               toast.dismiss();
//               setTimeout(() => {
//                 toast.error(`Payment verification failed: ${verifyData.message}`, {
//                   id: 'payment-verification-failed',
//                   style: {
//                     background: '#FFF5F5',
//                     color: '#C53030',
//                     border: '1px solid #FED7D7',
//                     borderRadius: '12px',
//                     padding: '16px',
//                     fontSize: '14px',
//                     fontWeight: '500',
//                   },
//                   iconTheme: {
//                     primary: '#C53030',
//                     secondary: '#FFF5F5',
//                   },
//                   duration: 4000,
//                 });
//               }, 200);
//             }
//           } catch (error) {
//             console.error("Verification error:", error);
//             toast.dismiss();
//             setTimeout(() => {
//               toast.error("Payment verification failed. Please contact support with your payment ID", {
//                 id: 'payment-error',
//                 style: {
//                   background: '#FFF5F5',
//                   color: '#C53030',
//                   border: '1px solid #FED7D7',
//                   borderRadius: '12px',
//                   padding: '16px',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                 },
//                 iconTheme: {
//                   primary: '#C53030',
//                   secondary: '#FFF5F5',
//                 },
//                 duration: 5000,
//               });
//             }, 200);
//           } finally {
//             setIsLoading(false);
//           }
//         },
//         modal: {
//           ondismiss: async () => {
//             setIsLoading(false);
//             console.log("Payment modal closed by user - Payment cancelled");
            
//             toast.dismiss();
            
//             setTimeout(() => {
//               toast("Payment cancelled. You can try again anytime! 💭", {
//                 id: 'payment-cancelled',
//                 style: {
//                   background: '#FFFBEB',
//                   color: '#92400E',
//                   border: '1px solid #FDE68A',
//                   borderRadius: '12px',
//                   padding: '16px',
//                   fontSize: '14px',
//                   fontWeight: '500',
//                 },
//                 icon: '⚠️',
//                 duration: 3000,
//               });
//             }, 100);
            
//             try {
//               await fetch(`${API_URL}/payment-failed`, {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   razorpay_order_id: order.id,
//                   razorpay_payment_id: null,
//                   error_code: "cancelled",
//                   error_description: "Payment cancelled by user",
//                   productName,
//                   email,
//                   phone,
//                 }),
//               });
//             } catch (err) {
//               console.error("Error recording cancelled payment:", err);
//             }
//           }
//         },
//         theme: { color: "#D48265" },
//         prefill: {
//           email: email,
//           contact: phone,
//         },
//       };

//       const rzp = new (window as any).Razorpay(options);
      
//       rzp.on('payment.failed', async function (response: any) {
//         setIsLoading(false);
//         console.error('Payment failed:', response.error);
        
//         toast.dismiss();
//         setTimeout(() => {
//           toast.error(`Payment failed: ${response.error.description}. Please try again or contact support`, {
//             id: 'payment-failed',
//             style: {
//               background: '#FFF5F5',
//               color: '#C53030',
//               border: '1px solid #FED7D7',
//               borderRadius: '12px',
//               padding: '16px',
//               fontSize: '14px',
//               fontWeight: '500',
//             },
//             iconTheme: {
//               primary: '#C53030',
//               secondary: '#FFF5F5',
//             },
//             duration: 5000,
//           });
//         }, 200);
        
//         try {
//           await fetch(`${API_URL}/payment-failed`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_order_id: response.error.metadata.order_id,
//               razorpay_payment_id: response.error.metadata.payment_id,
//               error_code: response.error.code,
//               error_description: response.error.description,
//               productName,
//               email,
//               phone,
//             }),
//           });
//         } catch (err) {
//           console.error("Error recording failed payment:", err);
//         }
//       });

//       rzp.open();
//     } catch (err) {
//       console.error("Payment initiation error:", err);
//       toast.dismiss();
//       setTimeout(() => {
//         toast.error("Failed to initiate payment. Please check your connection and try again", {
//           id: 'payment-initiation-error',
//           style: {
//             background: '#FFF5F5',
//             color: '#C53030',
//             border: '1px solid #FED7D7',
//             borderRadius: '12px',
//             padding: '16px',
//             fontSize: '14px',
//             fontWeight: '500',
//           },
//           iconTheme: {
//             primary: '#C53030',
//             secondary: '#FFF5F5',
//           },
//           duration: 4000,
//         });
//       }, 200);
//       setIsLoading(false);
//     }
//   };

//   // Calculate INR amount
//   const inrAmount = exchangeRate ? (amount * exchangeRate.USDINR) : null;
//   const displayInrAmount = inrAmount ? Math.ceil(inrAmount) : null;

//   return (
//    <>
//     <button
//       onClick={() => setShowModal(true)}
//       disabled={isLoading || loadingRate}
//       className="w-full mt-2 md:mt-3 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-semibold py-2 md:py-2.5 text-xs md:text-sm rounded-lg shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//     >
//       {isLoading ? (
//         <>
//           <Loader2 className="h-3 w-3 md:h-4 md:w-4 animate-spin" />
//           Processing...
//         </>
//       ) : (
//         <>
//           <ShoppingCart className="h-3 w-3 md:h-4 md:w-4" />
//           Download PDF ${amount}
//           <ArrowDown className="h-3 w-3 md:h-4 md:w-4 smooth-bounce" />
//         </>
//       )}
//     </button>

//     {/* User Details Modal - Contracted, Centered */}
//     {showModal && (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 py-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md border border-gray-100
//           max-h-[92vh] overflow-y-auto flex flex-col p-3 md:p-4">
          
//           {/* Modal Header */}
//           <div className="bg-gradient-to-r from-primary to-primary/90 p-3 md:p-4 rounded-xl mb-3">
//             <div className="flex justify-between items-center">
//               <h2 className="text-xl font-bold text-white">Enter Your Details</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="text-white hover:text-gray-200 transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <p className="text-primary-50 text-sm mt-2">
//               We'll use this information to send your purchase confirmation and download link.
//             </p>
//           </div>
          
//           {/* Currency Conversion Display */}
//           <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-3 mb-2">
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="font-semibold text-gray-800 text-sm">Currency Conversion</h3>
//               <button
//                 onClick={fetchExchangeRate}
//                 disabled={loadingRate}
//                 className="p-1 hover:bg-white rounded-lg transition-colors"
//                 title="Refresh rate"
//               >
//                 <RefreshCw 
//                   className={`h-4 w-4 text-gray-600 ${loadingRate ? 'animate-spin' : ''}`} 
//                 />
//               </button>
//             </div>
            
//             <div className="space-y-2">
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">USD Amount:</span>
//                 <span className="font-semibold">${amount} USD</span>
//               </div>
              
//               <div className="flex justify-between items-center">
//                 <span className="text-sm text-gray-600">INR Amount:</span>
//                 <span className="font-bold text-green-700">
//                   {loadingRate ? (
//                     <div className="flex items-center gap-2">
//                       <Loader2 className="h-3 w-3 animate-spin" />
//                       Loading...
//                     </div>
//                   ) : displayInrAmount ? (
//                     `₹${displayInrAmount} INR`
//                   ) : (
//                     "Rate unavailable"
//                   )}
//                 </span>
//               </div>
              
//               {exchangeRate && (
//                 <div className="text-xs text-gray-500 space-y-1 mt-2 pt-2 border-t border-gray-200">
//                   <div className="flex justify-between">
//                     <span>Exchange Rate:</span>
//                     <span>1 USD = ₹{exchangeRate.USDINR.toFixed(2)} INR</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Market Status:</span>
//                     <span className={`font-medium ${
//                       exchangeRate.marketStatus === 'open' 
//                         ? 'text-green-600' 
//                         : 'text-orange-600'
//                     }`}>
//                       {exchangeRate.marketStatus === 'open' ? '🟢 Live' : '🟡 Last Closing'}
//                     </span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Last Updated:</span>
//                     <span>{exchangeRate.lastUpdated} IST</span>
//                   </div>
//                   {exchangeRate.nextUpdate && (
//                     <div className="flex justify-between">
//                       <span>Next Update:</span>
//                       <span>{exchangeRate.nextUpdate} IST</span>
//                     </div>
//                   )}
//                 </div>
//               )}
              
//               {rateError && (
//                 <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded-lg mt-2">
//                   ⚠ Using fallback exchange rate. Actual amount may vary slightly.
//                 </div>
//               )}
//             </div>
//           </div>
          
//           {/* Email Input */}
//           <div className="space-y-2 mb-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Email Address *
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                   setErrors({ ...errors, email: "" });
//                 }}
//                 placeholder="your@email.com"
//                 className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
//                   errors.email 
//                     ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
//                     : "border-gray-200 focus:border-primary focus:ring-primary/20"
//                 }`}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
//                 <span>⚠</span> {errors.email}
//               </p>
//             )}
//           </div>
          
//           {/* Phone Input */}
//           <div className="space-y-2 mb-2">
//             <label className="block text-sm font-semibold text-gray-700">
//               Phone Number *
//             </label>
//             <div className="relative">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="tel"
//                 value={phone}
//                 onChange={(e) => {
//                   const value = e.target.value.replace(/\D/g, "");
//                   if (value.length <= 10) {
//                     setPhone(value);
//                     setErrors({ ...errors, phone: "" });
//                   }
//                 }}
//                 placeholder="9876543210"
//                 maxLength={10}
//                 className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
//                   errors.phone 
//                     ? "border-red-500 focus:border-red-500 focus:ring-red-200" 
//                     : "border-gray-200 focus:border-primary focus:ring-primary/20"
//                 }`}
//               />
//             </div>
//             {errors.phone && (
//               <p className="text-red-500 text-xs font-medium flex items-center gap-1 mt-1">
//                 <span>⚠</span> {errors.phone}
//               </p>
//             )}
//             <p className="text-gray-500 text-xs">
//               Must be 10 digits starting with 6-9
//             </p>
//           </div>
          
//           {/* Payment Summary */}
//           <div className="bg-gray-50 rounded-xl p-3 border border-gray-200 mb-2">
//             <h4 className="font-semibold text-gray-800 text-sm mb-2">Payment Summary</h4>
//             <div className="space-y-1 text-sm">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Product:</span>
//                 <span className="font-medium">{productName}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Amount:</span>
//                 <span className="font-medium">
//                   ${amount} USD ≈ {displayInrAmount ? `₹${displayInrAmount} INR` : 'Calculating...'}
//                 </span>
//               </div>
//               <div className="flex justify-between text-green-700 font-semibold pt-2 border-t border-gray-200">
//                 <span>Total Payable:</span>
//                 <span>{displayInrAmount ? `₹${displayInrAmount} INR` : 'Calculating...'}</span>
//               </div>
//             </div>
//           </div>
          
//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             disabled={!exchangeRate || loadingRate}
//             className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
//           >
//             {loadingRate ? (
//               <div className="flex items-center justify-center gap-2">
//                 <Loader2 className="h-4 w-4 animate-spin" />
//                 Loading Exchange Rate...
//               </div>
//             ) : (
//               `Pay ${displayInrAmount ? `₹${displayInrAmount}` : '...'} INR`
//             )}
//           </button>
          
//           <p className="text-xs text-gray-500 text-center mt-2">
//             Payment will be processed in Indian Rupees (INR) through Razorpay
//           </p>
//         </div>
//       </div>
//     )}
//   </>
//   );
// };

// export default RazorpayButton;