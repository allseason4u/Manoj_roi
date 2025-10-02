"use client";

import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Users,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Bell,
  Download,
  RefreshCw,
  CreditCard,
  Wallet,
  Settings,
  AlertCircle,
  CheckCircle,
  User,
} from "lucide-react";
import SidebarLayoutAdmin from "@/components/SidebarLayoutAdmin";

// Sample data
const plans = [
  { name: "Turbo $8", members: 120, income: 960, growth: 8.5 },
  { name: "Turbo $23", members: 90, income: 2070, growth: 12.3 },
  { name: "Booster $20", members: 50, income: 1000, growth: -2.1 },
  { name: "Booster $40", members: 40, income: 1600, growth: 15.7 },
  { name: "Booster $80", members: 30, income: 2400, growth: 22.4 },
  { name: "Booster $160", members: 20, income: 3200, growth: 18.9 },
  { name: "Booster $320", members: 10, income: 3200, growth: 25.6 },
];

const monthlyData = [
  { month: "Jan", income: 4000, members: 240, withdrawals: 1200 },
  { month: "Feb", income: 3000, members: 198, withdrawals: 800 },
  { month: "Mar", income: 5000, members: 300, withdrawals: 1500 },
  { month: "Apr", income: 4500, members: 280, withdrawals: 1100 },
  { month: "May", income: 6000, members: 350, withdrawals: 1800 },
  { month: "Jun", income: 7200, members: 420, withdrawals: 2100 },
];

const recentTransactions = [
  {
    id: 1,
    user: "John Doe",
    plan: "Turbo $23",
    amount: 23,
    status: "completed",
    time: "2 hours ago",
  },
  {
    id: 2,
    user: "Sarah Wilson",
    plan: "Booster $80",
    amount: 80,
    status: "pending",
    time: "5 hours ago",
  },
  {
    id: 3,
    user: "Mike Johnson",
    plan: "Booster $160",
    amount: 160,
    status: "completed",
    time: "1 day ago",
  },
  {
    id: 4,
    user: "Emma Davis",
    plan: "Turbo $8",
    amount: 8,
    status: "failed",
    time: "2 days ago",
  },
  {
    id: 5,
    user: "Alex Smith",
    plan: "Booster $40",
    amount: 40,
    status: "completed",
    time: "3 days ago",
  },
];

const topUsers = [
  { name: "Alice Cooper", totalInvested: 1280, referrals: 15, status: "VIP" },
  { name: "Bob Martin", totalInvested: 960, referrals: 12, status: "Premium" },
  { name: "Carol White", totalInvested: 840, referrals: 8, status: "Premium" },
  { name: "David Brown", totalInvested: 720, referrals: 6, status: "Basic" },
  { name: "Eva Green", totalInvested: 640, referrals: 4, status: "Basic" },
];

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
];

// Card wrapper
function Card({ children, className = "" }) {
  return (
    <div className={`bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
}

// Stat card
function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "blue",
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    yellow: "from-yellow-500 to-yellow-600",
    red: "from-red-500 to-red-600",
    purple: "from-purple-500 to-purple-600",
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-gray-400 text-sm font-medium mb-1 truncate">
            {title}
          </h3>
          <p className="text-xl sm:text-2xl font-bold text-white mb-2 truncate">
            {value}
          </p>
          {trend && (
            <div
              className={`flex items-center text-sm ${
                trend === "up" ? "text-green-400" : "text-red-400"
              }`}
            >
              {trend === "up" ? (
                <TrendingUp className="w-4 h-4 mr-1 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1 flex-shrink-0" />
              )}
              <span className="truncate">{trendValue}</span>
            </div>
          )}
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${colorClasses[color]} rounded-lg flex items-center justify-center flex-shrink-0 ml-3`}
        >
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </Card>
  );
}

export default function content() {
  const [currentTime, setCurrentTime] = useState(null);
  const [notifications] = useState(3);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totalMembers = plans.reduce((sum, p) => sum + p.members, 0);
  const totalIncome = plans.reduce((sum, p) => sum + p.income, 0);
  const pendingWithdrawals = 1450;
  const activeUsers = Math.floor(totalMembers * 0.65);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pt-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Welcome back, Admin. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-400">Current Time</p>
            <p className="text-white font-medium text-sm sm:text-base">
              {currentTime ? currentTime.toLocaleTimeString() : "--:--:--"}
            </p>
          </div>
          <button className="relative p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Members"
          value={totalMembers.toLocaleString()}
          icon={Users}
          trend="up"
          trendValue="8.2% from last month"
          color="blue"
        />
        <StatCard
          title="Total Income"
          value={`$${totalIncome.toLocaleString()}`}
          icon={DollarSign}
          trend="up"
          trendValue="12.5% from last month"
          color="green"
        />
        <StatCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          icon={UserCheck}
          trend="up"
          trendValue="5.1% from last month"
          color="purple"
        />
        <StatCard
          title="Pending Withdrawals"
          value={`${pendingWithdrawals.toLocaleString()}`}
          icon={Clock}
          trend="down"
          trendValue="3.2% from last month"
          color="yellow"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Plan Distribution
            </h3>
            <button className="text-gray-400 hover:text-white self-start sm:self-auto">
              <Download className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={plans}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={windowWidth < 640 ? 80 : 100}
                  dataKey="members"
                >
                  {plans.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Monthly Revenue
            </h3>
            <button className="text-gray-400 hover:text-white self-start sm:self-auto">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
          <div className="w-full h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-bold text-white mb-4">
            Plan Performance
          </h3>
          <div className="space-y-4">
            {plans.slice(0, 5).map((plan, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: COLORS[index] }}
                  />
                  <span className="text-white text-sm truncate">
                    {plan.name}
                  </span>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-white font-medium text-sm">
                    {plan.members} users
                  </p>
                  <p
                    className={`text-xs ${
                      plan.growth > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {plan.growth > 0 ? "+" : ""}
                    {plan.growth}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-white mb-4">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Server Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Database</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Connected</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Payment Gateway</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                <span className="text-yellow-400 text-sm">Maintenance</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Email Service</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm">Active</span>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Today's Signups</span>
              <span className="text-white font-medium">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Active Sessions</span>
              <span className="text-white font-medium">156</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Conversion Rate</span>
              <span className="text-green-400 font-medium">12.5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Avg. Investment</span>
              <span className="text-white font-medium">$85</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity & Top Users */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Recent Transactions
            </h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm self-start sm:self-auto">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-gray-300" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium text-sm truncate">
                      {transaction.user}
                    </p>
                    <p className="text-gray-400 text-xs truncate">
                      {transaction.plan}
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-white font-medium text-sm">
                    ${transaction.amount}
                  </p>
                  <div className="flex items-center gap-2 justify-end">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        transaction.status === "completed"
                          ? "bg-green-400"
                          : transaction.status === "pending"
                          ? "bg-yellow-400"
                          : "bg-red-400"
                      }`}
                    />
                    <span className="text-xs text-gray-400 truncate">
                      {transaction.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Top Investors
            </h3>
            <button className="text-blue-400 hover:text-blue-300 text-sm self-start sm:self-auto">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {topUsers.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-medium text-sm truncate">
                      {user.name}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {user.referrals} referrals
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="text-white font-medium text-sm">
                    ${user.totalInvested}
                  </p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      user.status === "VIP"
                        ? "bg-yellow-600 text-yellow-100"
                        : user.status === "Premium"
                        ? "bg-purple-600 text-purple-100"
                        : "bg-gray-600 text-gray-100"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-6">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <button className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group">
            <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="text-white text-xs sm:text-sm text-center">
              Create Plan
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group">
            <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="text-white text-xs sm:text-sm text-center">
              Withdrawals
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group">
            <Download className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:scale-110 transition-transform" />
            <span className="text-white text-xs sm:text-sm text-center">
              Export Data
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="text-white text-xs sm:text-sm text-center">
              Send Notice
            </span>
          </button>
          <button className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group">
            <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:scale-110 transition-transform" />
            <span className="text-white text-xs sm:text-sm text-center">
              Settings
            </span>
          </button>
        </div>
      </Card>

      {/* Alerts & Notifications */}
      <Card>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
          System Alerts
        </h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-900/20 border border-red-800 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-red-400 font-medium text-sm">
                High Withdrawal Volume
              </p>
              <p className="text-gray-400 text-xs">
                Unusual withdrawal activity detected in the last 24 hours
              </p>
            </div>
            <span className="text-gray-500 text-xs flex-shrink-0">2h ago</span>
          </div>
          <div className="flex items-start gap-3 p-3 bg-yellow-900/20 border border-yellow-800 rounded-lg">
            <Clock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-yellow-400 font-medium text-sm">
                Payment Gateway Maintenance
              </p>
              <p className="text-gray-400 text-xs">
                Scheduled maintenance in 2 hours
              </p>
            </div>
            <span className="text-gray-500 text-xs flex-shrink-0">1h ago</span>
          </div>
          <div className="flex items-start gap-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-green-400 font-medium text-sm">
                System Backup Completed
              </p>
              <p className="text-gray-400 text-xs">
                Daily backup successfully completed
              </p>
            </div>
            <span className="text-gray-500 text-xs flex-shrink-0">30m ago</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
