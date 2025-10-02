"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  MoreVertical,
  Settings,
  Ban,
  Unlock,
  Star,
  UserCheck,
  UserX,
  Shield,
  AlertTriangle,
} from "lucide-react";

// Sample user data
const sampleUsers = [
  {
    id: 1,
    name: "Alice Cooper",
    email: "alice.cooper@email.com",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    lastActive: "2024-09-20",
    totalInvested: 1280,
    currentBalance: 145.5,
    referrals: 15,
    status: "active",
    tier: "VIP",
    planHistory: ["Booster $80", "Booster $160", "Booster $320"],
    totalEarnings: 2450.75,
    avatar: "AC",
  },
  {
    id: 2,
    name: "Bob Martin",
    email: "bob.martin@email.com",
    phone: "+1 (555) 234-5678",
    joinDate: "2024-02-08",
    lastActive: "2024-09-19",
    totalInvested: 960,
    currentBalance: 89.25,
    referrals: 12,
    status: "active",
    tier: "Premium",
    planHistory: ["Turbo $23", "Booster $40", "Booster $80"],
    totalEarnings: 1875.3,
    avatar: "BM",
  },
  {
    id: 3,
    name: "Carol White",
    email: "carol.white@email.com",
    phone: "+1 (555) 345-6789",
    joinDate: "2024-03-12",
    lastActive: "2024-09-18",
    totalInvested: 840,
    currentBalance: 234.8,
    referrals: 8,
    status: "inactive",
    tier: "Premium",
    planHistory: ["Turbo $8", "Turbo $23", "Booster $40"],
    totalEarnings: 1250.6,
    avatar: "CW",
  },
  {
    id: 4,
    name: "David Brown",
    email: "david.brown@email.com",
    phone: "+1 (555) 456-7890",
    joinDate: "2024-04-20",
    lastActive: "2024-09-20",
    totalInvested: 720,
    currentBalance: 67.15,
    referrals: 6,
    status: "suspended",
    tier: "Basic",
    planHistory: ["Turbo $8", "Booster $20"],
    totalEarnings: 890.25,
    avatar: "DB",
  },
  {
    id: 5,
    name: "Eva Green",
    email: "eva.green@email.com",
    phone: "+1 (555) 567-8901",
    joinDate: "2024-05-10",
    lastActive: "2024-09-20",
    totalInvested: 640,
    currentBalance: 156.4,
    referrals: 4,
    status: "active",
    tier: "Basic",
    planHistory: ["Turbo $8", "Turbo $23"],
    totalEarnings: 675.9,
    avatar: "EG",
  },
  {
    id: 6,
    name: "Frank Wilson",
    email: "frank.wilson@email.com",
    phone: "+1 (555) 678-9012",
    joinDate: "2024-06-15",
    lastActive: "2024-09-15",
    totalInvested: 320,
    currentBalance: 45.2,
    referrals: 2,
    status: "pending",
    tier: "Basic",
    planHistory: ["Turbo $8"],
    totalEarnings: 125.75,
    avatar: "FW",
  },
  {
    id: 7,
    name: "Grace Davis",
    email: "grace.davis@email.com",
    phone: "+1 (555) 789-0123",
    joinDate: "2024-07-22",
    lastActive: "2024-09-20",
    totalInvested: 1560,
    currentBalance: 289.75,
    referrals: 18,
    status: "active",
    tier: "VIP",
    planHistory: ["Booster $160", "Booster $320"],
    totalEarnings: 3250.4,
    avatar: "GD",
  },
  {
    id: 8,
    name: "Henry Johnson",
    email: "henry.johnson@email.com",
    phone: "+1 (555) 890-1234",
    joinDate: "2024-08-05",
    lastActive: "2024-09-17",
    totalInvested: 480,
    currentBalance: 92.6,
    referrals: 5,
    status: "active",
    tier: "Basic",
    planHistory: ["Booster $20", "Booster $40"],
    totalEarnings: 445.8,
    avatar: "HJ",
  },
];

 
export default function UserManagement() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [viewMode, setViewMode] = useState("card"); // 'card' or 'table'

  // Filter users based on search and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesTier = tierFilter === "all" || user.tier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400 bg-green-900/20 border-green-800";
      case "inactive":
        return "text-gray-400 bg-gray-900/20 border-gray-800";
      case "suspended":
        return "text-red-400 bg-red-900/20 border-red-800";
      case "pending":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800";
    }
  };

  const getTierColor = (tier) => {
    switch (tier) {
      case "VIP":
        return "text-yellow-400 bg-yellow-900/20 border-yellow-800";
      case "Premium":
        return "text-purple-400 bg-purple-900/20 border-purple-800";
      case "Basic":
        return "text-blue-400 bg-blue-900/20 border-blue-800";
      default:
        return "text-gray-400 bg-gray-900/20 border-gray-800";
    }
  };

  const handleUserAction = (action, userId) => {
    setUsers((prev) =>
      prev.map((user) => {
        if (user.id === userId) {
          switch (action) {
            case "activate":
              return { ...user, status: "active" };
            case "suspend":
              return { ...user, status: "suspended" };
            case "promote":
              const tiers = ["Basic", "Premium", "VIP"];
              const currentIndex = tiers.indexOf(user.tier);
              return {
                ...user,
                tier: currentIndex < 2 ? tiers[currentIndex + 1] : user.tier,
              };
            default:
              return user;
          }
        }
        return user;
      })
    );
  };

  const UserModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">User Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XCircle className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            {/* User Header */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {user.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{user.name}</h3>
                <p className="text-gray-400">{user.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                      user.status
                    )}`}
                  >
                    {user.status.toUpperCase()}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full border ${getTierColor(
                      user.tier
                    )}`}
                  >
                    {user.tier}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <DollarSign className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Total Invested</p>
                <p className="text-lg font-bold text-white">
                  ${user.totalInvested}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Total Earnings</p>
                <p className="text-lg font-bold text-white">
                  ${user.totalEarnings}
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Referrals</p>
                <p className="text-lg font-bold text-white">{user.referrals}</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg text-center">
                <DollarSign className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <p className="text-xs text-gray-400">Current Balance</p>
                <p className="text-lg font-bold text-white">
                  ${user.currentBalance}
                </p>
              </div>
            </div>

            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-bold text-white mb-3">
                  Personal Information
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      Joined {user.joinDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-300">
                      Last active {user.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white mb-3">
                  Plan History
                </h4>
                <div className="space-y-2">
                  {user.planHistory.map((plan, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-700 rounded"
                    >
                      <span className="text-gray-300 text-sm">{plan}</span>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-700">
              <button
                onClick={() => {
                  handleUserAction("activate", user.id);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                Activate
              </button>
              <button
                onClick={() => {
                  handleUserAction("suspend", user.id);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
              >
                <Ban className="w-4 h-4" />
                Suspend
              </button>
              <button
                onClick={() => {
                  handleUserAction("promote", user.id);
                  onClose();
                }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                <Star className="w-4 h-4" />
                Promote Tier
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            User Management
          </h1>
          <p className="text-gray-400">
            Manage and monitor all registered users
          </p>
        </div>
        <div className="flex items-center gap-4">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === "card"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="grid grid-cols-2 gap-1">
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
                <div className="w-2 h-2 bg-current rounded-sm"></div>
              </div>
              Cards
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                viewMode === "table"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <div className="flex flex-col gap-1">
                <div className="w-4 h-0.5 bg-current"></div>
                <div className="w-4 h-0.5 bg-current"></div>
                <div className="w-4 h-0.5 bg-current"></div>
              </div>
              Table
            </button>
          </div>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors">
            <Plus className="w-4 h-4" />
            Add User
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <Users className="w-5 h-5 text-blue-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">{users.length}</h3>
          <p className="text-gray-400 text-sm">Total Users</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <UserCheck className="w-5 h-5 text-green-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">
            {users.filter((u) => u.status === "active").length}
          </h3>
          <p className="text-gray-400 text-sm">Active Users</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <Star className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">
            {users.filter((u) => u.tier === "VIP").length}
          </h3>
          <p className="text-gray-400 text-sm">VIP Members</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 text-center">
          <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-white">
            $
            {users
              .reduce((sum, u) => sum + u.totalInvested, 0)
              .toLocaleString()}
          </h3>
          <p className="text-gray-400 text-sm">Total Invested</p>
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <Users className="w-4 h-4 text-blue-400 mx-auto mb-1" />
          <h3 className="text-lg font-bold text-white">{users.length}</h3>
          <p className="text-gray-400 text-xs">Total Users</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <UserCheck className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <h3 className="text-lg font-bold text-white">
            {users.filter((u) => u.status === "active").length}
          </h3>
          <p className="text-gray-400 text-xs">Active Users</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <Star className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
          <h3 className="text-lg font-bold text-white">
            {users.filter((u) => u.tier === "VIP").length}
          </h3>
          <p className="text-gray-400 text-xs">VIP Members</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <DollarSign className="w-4 h-4 text-green-400 mx-auto mb-1" />
          <h3 className="text-lg font-bold text-white">
            $
            {users
              .reduce((sum, u) => sum + u.totalInvested, 0)
              .toLocaleString()}
          </h3>
          <p className="text-gray-400 text-xs">Total Invested</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>

          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Tiers</option>
            <option value="VIP">VIP</option>
            <option value="Premium">Premium</option>
            <option value="Basic">Basic</option>
          </select>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400 text-sm">
              {filteredUsers.length} of {users.length} users
            </span>
          </div>
        </div>
      </div>

      {/* Users Display - Cards or Table */}
      {viewMode === "card" ? (
        /* Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedUsers.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 rounded-xl p-6 hover:bg-gray-750 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {user.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="relative">
                  <button className="text-gray-400 hover:text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Total Invested</span>
                  <span className="text-white font-medium">
                    ${user.totalInvested}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Current Balance</span>
                  <span className="text-green-400 font-medium">
                    ${user.currentBalance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Referrals</span>
                  <span className="text-blue-400 font-medium">
                    {user.referrals}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                    user.status
                  )}`}
                >
                  {user.status.toUpperCase()}
                </span>
                <span
                  className={`px-2 py-1 text-xs rounded-full border ${getTierColor(
                    user.tier
                  )}`}
                >
                  {user.tier}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowUserModal(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors text-sm">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Table View */
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    User
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Contact
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Status
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Tier
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Invested
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Balance
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Referrals
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Join Date
                  </th>
                  <th className="text-left p-4 text-gray-300 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`border-t border-gray-700 hover:bg-gray-700/50 transition-colors ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                    }`}
                  >
                    {/* User Column */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {user.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-xs">
                            ID: #{user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact Column */}
                    <td className="p-4">
                      <div>
                        <p className="text-gray-300 text-sm">{user.email}</p>
                        <p className="text-gray-400 text-xs">{user.phone}</p>
                      </div>
                    </td>

                    {/* Status Column */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                          user.status
                        )}`}
                      >
                        {user.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Tier Column */}
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full border ${getTierColor(
                          user.tier
                        )}`}
                      >
                        {user.tier}
                      </span>
                    </td>

                    {/* Invested Column */}
                    <td className="p-4">
                      <span className="text-white font-medium">
                        ${user.totalInvested.toLocaleString()}
                      </span>
                    </td>

                    {/* Balance Column */}
                    <td className="p-4">
                      <span className="text-green-400 font-medium">
                        ${user.currentBalance}
                      </span>
                    </td>

                    {/* Referrals Column */}
                    <td className="p-4">
                      <span className="text-blue-400 font-medium">
                        {user.referrals}
                      </span>
                    </td>

                    {/* Join Date Column */}
                    <td className="p-4">
                      <div>
                        <p className="text-gray-300 text-sm">{user.joinDate}</p>
                        <p className="text-gray-400 text-xs">
                          Active: {user.lastActive}
                        </p>
                      </div>
                    </td>

                    {/* Actions Column */}
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <div className="text-gray-400 text-sm">
          Showing {startIndex + 1}-
          {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
          {filteredUsers.length} users
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-2 rounded-lg transition-colors ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 hover:bg-gray-600 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
    
      <div className="ml-64 p-6">
        {activeTab === "users" && renderUserManagement()}
        {activeTab !== "users" && (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-600" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Section
              </h2>
              <p className="text-gray-400 mb-6">
                This section is under development and will be available soon.
              </p>
              <button
                onClick={() => setActiveTab("users")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Back to Users
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
