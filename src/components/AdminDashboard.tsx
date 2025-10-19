/* eslint-disable react-hooks/exhaustive-deps */
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
  Download,
  RefreshCw,
  Search,
  XCircle,
  Clock,
  Activity,
  AlertCircle,
  BarChart3,
  Globe,
  MousePointer,
  FileText,
  TrendingDown,
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
  failedPayments: number;
  pendingPayments: number;
}

interface AnalyticsData {
  users: {
    total: number;
    new: number;
    returning: number;
  };
  sessions: {
    total: number;
    avgDuration: string;
    bounceRate: string;
  };
  pageviews: {
    total: number;
    perSession: string;
  };
  topPages: Array<{
    path: string;
    views: number;
    uniqueViews: number;
  }>;
  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  locations: Array<{
    country: string;
    users: number;
  }>;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const AUTHORIZED_ADMINS = [
  "vietbaseai@gmail.com",
  "peche.purpose@gmail.com",
  "ce22b074@smail.iitm.ac.in",
];

const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
const [activeTab, setActiveTab] = useState<"payments" | "subscriptions" | "analytics">("payments");
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken");
    const storedEmail = localStorage.getItem("adminEmail");
    if (storedToken && storedEmail && AUTHORIZED_ADMINS.includes(storedEmail)) {
      setToken(storedToken);
      setEmail(storedEmail);
      setIsLoggedIn(true);
    }
  }, []);

 useEffect(() => {
  if (token && isLoggedIn) {
    fetchPayments();
    fetchStats();
    if (activeTab === "analytics") {
      fetchAnalytics();
    }
    if (activeTab === "subscriptions") {
      fetchSubscriptions();
    }
  }
}, [token, isLoggedIn, activeTab]);

  useEffect(() => {
    filterPayments();
  }, [payments, searchTerm, filterStatus]);

  const filterPayments = () => {
    let filtered = [...payments];

    if (filterStatus !== "all") {
      filtered = filtered.filter((p) => p.status === filterStatus);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.payment_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.phone?.includes(searchTerm) ||
          p.product_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPayments(filtered);
  };

  const handleLogin = async () => {
    setError("");

    if (!AUTHORIZED_ADMINS.includes(email)) {
      setError("Unauthorized email address");
      return;
    }

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
        setError("");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
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
        localStorage.setItem("adminEmail", email);
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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/analytics`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setAnalyticsData(data.analytics);
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };
const fetchSubscriptions = async () => {
  try {
    const res = await fetch(`${API_URL}/admin/subscriptions`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setSubscriptions(data.subscriptions);
    } else {
      console.error("Failed to fetch subscriptions:", data.message);
    }
  } catch (err) {
    console.error("Error fetching subscriptions:", err);
  }
};
const downloadSubscriptions = () => {
  const headers = ["Email", "Created At"];
  
  const csvContent = [
    headers.join(","),
    ...subscriptions.map((s) =>
      [
        `"${s.email}"`,
        `"${new Date(s.created_at).toLocaleString()}"`,
      ].join(",")
    ),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `subscriptions_${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
  const handleRefresh = async () => {
    setIsRefreshing(true);
    if (activeTab === "payments") {
      await Promise.all([fetchPayments(), fetchStats()]);
    } else {
      await fetchAnalytics();
    }
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const downloadExcel = () => {
    const headers = [
      "Payment ID",
      "Order ID",
      "Customer Name",
      "Email",
      "Phone",
      "Product",
      "Amount",
      "Currency",
      "Payment Method",
      "Status",
      "Payment Date",
      "Created At",
    ];

    const csvContent = [
      headers.join(","),
      ...filteredPayments.map((p) =>
        [
          `"${p.payment_id}"`,
          `"${p.order_id}"`,
          `"${p.name || "N/A"}"`,
          `"${p.email || "N/A"}"`,
          `"${p.phone || "N/A"}"`,
          `"${p.product_name}"`,
          p.amount,
          p.currency,
          `"${p.payment_method}"`,
          `"${p.status}"`,
          `"${new Date(p.payment_date).toLocaleString()}"`,
          `"${new Date(p.created_at).toLocaleString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `payments_${new Date().toISOString().split("T")[0]}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    setToken(null);
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setOtp("");
    setShowOtpInput(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "captured":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "failed":
        return "bg-red-100 text-red-800 border-red-300";
      case "cancelled":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "authorized":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "refunded":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "captured":
        return <CheckCircle className="h-3.5 w-3.5" />;
      case "failed":
        return <XCircle className="h-3.5 w-3.5" />;
      case "authorized":
        return <Clock className="h-3.5 w-3.5" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5" />;
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md p-8 border border-orange-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-rose-400 rounded-xl mb-4 shadow-lg">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
              Pêche Admin
            </h1>
            <p className="text-gray-600 mt-2">
              {showOtpInput
                ? "Enter the OTP sent to your email"
                : "Secure access to dashboard"}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {!showOtpInput ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full pl-10 pr-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="admin@peche.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                    className="w-full pl-10 pr-12 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  onKeyPress={(e) =>
                    e.key === "Enter" && otp.length === 6 && handleVerifyOtp()
                  }
                  maxLength={6}
                  className="w-full px-4 py-2.5 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent text-center text-2xl tracking-widest font-mono transition-all"
                  placeholder="000000"
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white font-semibold py-2.5 rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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
                className="w-full text-orange-600 hover:text-orange-700 font-medium py-2"
              >
                ← Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-orange-50">
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-400 to-rose-400 rounded-lg shadow">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-rose-600 bg-clip-text text-transparent">
                  Pêche Dashboard
                </h1>
                <p className="text-sm text-gray-600">{email}</p>
              </div>
            </div>
           <div className="flex items-center gap-3">
  <button
    onClick={handleRefresh}
    disabled={isRefreshing}
    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50"
  >
    <RefreshCw
      className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
    />
    Refresh
  </button>
  {activeTab === "payments" && (
    <>
      <button
        onClick={downloadExcel}
        className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-all shadow-sm"
      >
        <Download className="h-4 w-4" />
        Export Payments
      </button>
      <button
        onClick={() => {
          fetchSubscriptions();
          downloadSubscriptions();
        }}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
      >
        <Mail className="h-4 w-4" />
        Export Subscriptions
      </button>
    </>
  )}
  <button
    onClick={handleLogout}
    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all shadow-sm"
  >
    <LogOut className="h-4 w-4" />
    Logout
  </button>
</div>
          </div>

          <div className="flex gap-2 mt-4">
  <button
    onClick={() => setActiveTab("payments")}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      activeTab === "payments"
        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
        : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
    }`}
  >
    <DollarSign className="h-4 w-4" />
    Payments
  </button>
  <button
    onClick={() => setActiveTab("subscriptions")}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      activeTab === "subscriptions"
        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
        : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
    }`}
  >
    <Mail className="h-4 w-4" />
    Subscriptions
  </button>
  <button
    onClick={() => setActiveTab("analytics")}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
      activeTab === "analytics"
        ? "bg-gradient-to-r from-orange-500 to-rose-500 text-white shadow-sm"
        : "bg-white text-gray-700 hover:bg-orange-50 border border-orange-100"
    }`}
  >
    <BarChart3 className="h-4 w-4" />
    Analytics
  </button>
</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
  {/* Payments Tab */}
  {activeTab === "payments" && (
    <>
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  ₹{stats.totalRevenue}
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  Successful payments only
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.totalPayments}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  All transactions
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Successful
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stats.successfulPayments}
                </p>
                <p className="text-xs text-emerald-600 mt-1">
                  {stats.successRate}% success rate
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <CheckCircle className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Failed/Pending
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {(stats.failedPayments || 0) +
                    (stats.pendingPayments || 0)}
                </p>
                <p className="text-xs text-red-600 mt-1">
                  Requires attention
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by payment ID, name, email, phone..."
              className="w-full pl-10 pr-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-400 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="captured">Captured</option>
              <option value="failed">Failed</option>
              <option value="authorized">Authorized</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
        <div className="mt-3 text-sm text-gray-600">
          Showing {filteredPayments.length} of {payments.length} payments
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
  <tr>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Payment ID
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Order ID
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Customer Details
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Product
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Amount
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Method
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Status
    </th>
    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
      Date
    </th>
  </tr>
</thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-4 py-12 text-center text-gray-500"
                  >
                    No payments found
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-xs font-mono text-gray-900 break-all">
                          {payment.payment_id}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-mono text-gray-700 break-all">
                        {payment.order_id}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        {payment.name && (
                          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                            <User className="h-3 w-3 text-gray-400 flex-shrink-0" />
                            <span className="break-all">
                              {payment.name}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Mail className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          <span className="break-all">
                            {payment.email || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-600">
                          <Phone className="h-3 w-3 text-gray-400 flex-shrink-0" />
                          {payment.phone || "N/A"}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">
                        {payment.product_name}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-gray-900">
                        ₹{payment.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 capitalize">
                        {payment.payment_method}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border capitalize ${getStatusColor(
                          payment.status
                        )}`}
                      >
                        {getStatusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-xs text-gray-600">
                        <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {new Date(
                            payment.payment_date
                          ).toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )}

  {/* Subscriptions Tab */}
  {activeTab === "subscriptions" && (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {subscriptions.length} subscribers
          </div>
          <button
            onClick={downloadSubscriptions}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm"
          >
            <Download className="h-4 w-4" />
            Export Subscriptions
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Subscribed Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subscriptions.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-4 py-12 text-center text-gray-500">
                    No subscribers found
                  </td>
                </tr>
              ) : (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="text-sm text-gray-900 break-all">
                          {subscription.email}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-sm text-gray-600">
                        <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                          {new Date(subscription.created_at).toLocaleString()}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}

  {/* Analytics Tab */}
  {activeTab === "analytics" && (
    <>
      {analyticsLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-orange-600" />
        </div>
      ) : analyticsData ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.users.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    {analyticsData.users.new.toLocaleString()} new users
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Sessions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.sessions.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Avg: {analyticsData.sessions.avgDuration}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Page Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.pageviews.total.toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    {analyticsData.pageviews.perSession} per session
                  </p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Bounce Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {analyticsData.sessions.bounceRate}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Sessions with 1 page
                  </p>
                </div>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Top Pages
                </h3>
              </div>
              <div className="space-y-3">
                {analyticsData.topPages.map((page, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {page.path}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {page.uniqueViews.toLocaleString()} unique views
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {page.views.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">views</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MousePointer className="h-5 w-5 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  Device Breakdown
                </h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Desktop
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {analyticsData.devices.desktop}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-orange-500 to-rose-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${analyticsData.devices.desktop}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Mobile
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {analyticsData.devices.mobile}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-rose-400 to-orange-400 h-3 rounded-full transition-all"
                      style={{
                        width: `${analyticsData.devices.mobile}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Tablet
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      {analyticsData.devices.tablet}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-orange-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${analyticsData.devices.tablet}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-orange-600" />
              <h3 className="text-lg font-semibold text-gray-900">
                Top Locations
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {analyticsData.locations.map((location, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-rose-50 rounded-lg border border-orange-100"
                >
                  <span className="text-sm font-medium text-gray-900">
                    {location.country}
                  </span>
                  <span className="text-sm font-bold text-orange-600">
                    {location.users.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Analytics Data
          </h3>
          <p className="text-gray-600 mb-4">
            Analytics data will appear here once configured
          </p>
          <button
            onClick={fetchAnalytics}
            className="px-4 py-2 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 text-white rounded-lg transition-all"
          >
            Load Analytics
          </button>
        </div>
      )}
    </>
  )}
</main>
    </div>
  );
};

export default AdminDashboard;
