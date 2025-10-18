import React, { useState, useEffect } from "react";
import {
  LogOut,
  TrendingUp,
  DollarSign,
  Users,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  CreditCard,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  User,
} from "lucide-react";

interface Payment {
  id: string;
  payment_id: string;
  order_id: string;
  name: string;
  email: string;
  phone: string;
  product_name: string;
  amount: number;
  currency: string;
  payment_method: string;
  status: string;
  payment_date: string;
  created_at: string;
}

interface Stats {
  totalPayments: number;
  totalRevenue: string;
  successfulPayments: number;
  successRate: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";


const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
const [activeTab, setActiveTab] = useState<"dashboard" | "analytics">("dashboard");
const [vercelAnalytics, setVercelAnalytics] = useState<any>(null);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("adminToken")
  );

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      fetchPayments();
      fetchStats();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        setShowOtpInput(true);
        alert("OTP sent to your email!");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/admin/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        setIsLoggedIn(true);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/payments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };
const fetchVercelAnalytics = async () => {
  try {
    const res = await fetch(`${API_URL}/admin/vercel-analytics`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setVercelAnalytics(data.analytics);
    }
  } catch (err) {
    console.error("Error fetching Vercel analytics:", err);
  }
};

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOtpInput(false);
  };

  // Login Screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 border-2 border-orange-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-400 to-rose-400 rounded-2xl mb-4 shadow-lg">
              <Lock className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Pêche Admin</h1>
            <p className="text-gray-600 mt-2">
              {showOtpInput
                ? "Enter the OTP sent to your email"
                : "Enter your credentials to access the dashboard"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4">
              {error}
            </div>
          )}

          {!showOtpInput ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                    placeholder="admin@peche.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-orange-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-center text-2xl tracking-widest font-bold transition-all"
                  placeholder="000000"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify OTP"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowOtpInput(false);
                  setOtp("");
                  setError("");
                }}
                className="w-full text-orange-500 hover:text-orange-600 font-semibold py-2"
              >
                ← Back to Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-rose-50">
      {/* Header */}
      <header className="bg-white shadow-md border-b-2 border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-rose-500 bg-clip-text text-transparent">
                Pêche Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                Welcome back, {email}
              </p>
            </div>
            <div className="flex items-center gap-3">
  <button
    onClick={() => {
      setActiveTab("dashboard");
    }}
    className={`px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all ${
      activeTab === "dashboard"
        ? "bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-lg"
        : "bg-white text-gray-700 border-2 border-orange-200 hover:bg-orange-50"
    }`}
  >
    Dashboard
  </button>

  <button
    onClick={() => {
      setActiveTab("analytics");
      fetchVercelAnalytics();
    }}
    className={`px-5 py-2.5 rounded-xl font-semibold shadow-md transition-all ${
      activeTab === "analytics"
        ? "bg-gradient-to-r from-orange-400 to-rose-400 text-white shadow-lg"
        : "bg-white text-gray-700 border-2 border-orange-200 hover:bg-orange-50"
    }`}
  >
    Analytics
  </button>

  <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-400 to-rose-400 hover:from-red-500 hover:to-rose-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
  >
    <LogOut className="h-4 w-4" />
    Logout
  </button>
</div>

          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    ₹{stats.totalRevenue}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-2xl shadow-lg">
                  <DollarSign className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Total Payments
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalPayments}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-4 rounded-2xl shadow-lg">
                  <Users className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Successful
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.successfulPayments}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-4 rounded-2xl shadow-lg">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-orange-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-semibold">
                    Success Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.successRate}%
                  </p>
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-rose-500 p-4 rounded-2xl shadow-lg">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payments Table */}
        {activeTab === "dashboard" ? (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100">
          <div className="px-6 py-5 border-b-2 border-orange-100 bg-gradient-to-r from-orange-50 to-rose-50">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Payments
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              View all payment transactions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Method
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-gray-500 font-medium"
                    >
                      No payments found
                    </td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-orange-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-orange-400" />
                          <span className="text-sm font-mono text-gray-900 font-medium">
                            {payment.payment_id.substring(0, 16)}...
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col space-y-1">
                          {payment.name && (
                            <div className="flex items-center gap-2 text-sm text-gray-900 font-semibold">
                              <User className="h-3 w-3 text-orange-400" />
                              {payment.name}
                            </div>
                          )}
                          <div className="flex items-center gap-2 text-xs text-gray-700">
                            <Mail className="h-3 w-3 text-orange-400" />
                            {payment.email || "N/A"}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Phone className="h-3 w-3 text-orange-400" />
                            {payment.phone || "N/A"}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {payment.product_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900">
                          ₹{payment.amount}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 capitalize border border-blue-200">
                          {payment.payment_method}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold capitalize border-2 ${
                            payment.status === "captured"
                              ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200"
                              : payment.status === "failed"
                              ? "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200"
                              : payment.status === "cancelled"
                              ? "bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300"
                              : payment.status === "authorized"
                              ? "bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-200"
                              : payment.status === "refunded"
                              ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200"
                              : "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200"
                          }`}
                        >
                          {payment.status === "captured" && "✓ Success"}
                          {payment.status === "failed" && "✗ Failed"}
                          {payment.status === "cancelled" && "⊘ Cancelled"}
                          {payment.status === "authorized" && "⏳ Authorized"}
                          {payment.status === "refunded" && "↩ Refunded"}
                          {!["captured", "failed", "cancelled", "authorized", "refunded"].includes(payment.status) && payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                          <Calendar className="h-3 w-3 text-orange-400" />
                          {new Date(payment.payment_date).toLocaleDateString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border-2 border-orange-100 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics</h2>
            {vercelAnalytics ? (
              <pre>{JSON.stringify(vercelAnalytics, null, 2)}</pre>
            ) : (
              <p>Loading analytics data...</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;