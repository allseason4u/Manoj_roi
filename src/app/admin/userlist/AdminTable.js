"use client";
import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Filter,
  Download,
  Plus,
  Edit,
  Trash2,
  Eye,
  Phone,
  DollarSign,
  CheckCircle,
  MoreVertical,
  Ban,
  Star,
  UserCheck,
  UserX,
  ChevronDown,
  User,
  Wallet,
} from "lucide-react";
import {
  UserModal,
  MobileActionMenu,
  handleUserAction,
  getStatusColor,
  sampleUsers,
} from "./component";
import { apiCallerAdmin } from "@/utils/apiCallerAdmin";
import { toast } from "react-toastify";

const AdminTable = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [viewMode, setViewMode] = useState("table");
  const [showFilters, setShowFilters] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.memberid.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesTier = tierFilter === "all" || user.tier === tierFilter;

    return matchesSearch && matchesStatus && matchesTier;
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { success, data, error } = await apiCallerAdmin(
          "/admin/userlist"
        );
        if (success) {
          if (Array.isArray(data) && data.length) {
            setUsers(data);
          } else {
            setUsers([{}]);
          }
        } else {
          console.error("Fetch error:", error);
        }
      } catch (err) {
        console.error("Failed to fetch admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const handleTurboPack = async (memberid, packageId) => {
    setLoading(true);
    try {
      const { success, data, error } = await apiCallerAdmin(
        "/admin/block-package",
        {
          memberid,
          plan: "turbo",
          packageId,
        }
      );
      if (success) {
        if (data.length && data.result == "y") {
          console.log("DOne !");
        }
      } else {
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBoosterPack = async (memberid, packageId) => {
    setLoading(true);
    try {
      debugger;
      const { success, data, error } = await apiCallerAdmin(
        "/admin/block-package",
        {
          memberid,
          plan: "booster",
          packageId,
        }
      );
      if (success) {
        let mydata = data[0];
        if (mydata.result == "y") {
          getSelectedMember(memberid);
          toast.success(mydata.msg || "Package updated successfully!");
        } else {
          toast.error(mydata.msg || "Something went wrong");
        }
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const getSelectedMember = async (memberid) => {
    setLoading(true);
    try {
      const { success, data, error } = await apiCallerAdmin(
        "/admin/selectedUser",
        {
          memberid,
        }
      );
      if (success) {
        if (Array.isArray(data) && data.length) {
          setSelectedUser(data[0]);
        } else {
          setSelectedUser([{}]);
        }
      } else {
        console.error("Fetch error:", error);
      }
    } catch (err) {
      console.error("Failed to fetch admin data", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start sm:gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white sm:mb-2">
              User Management
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage and monitor all registered users
            </p>
          </div>

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 ">
            {/* View Mode Toggle - Hide on mobile, show on tablet+ */}
            <div className="hidden sm:flex items-center bg-gray-800 rounded-lg p-1">
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
                <span className="hidden md:inline">Cards</span>
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
                <span className="hidden md:inline">Table</span>
              </button>
            </div>

            <div className="hidden sm:flex gap-2">
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add User</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mx-auto mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {users.length}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Total Users</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {users.filter((u) => u.status === "active").length}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Active Users</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <UserX className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mx-auto mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              {users.filter((u) => u.status === "inactive").length}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">
              In Active Members
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg p-3 sm:p-4 text-center">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-2" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              $
              {users
                .reduce((sum, u) => sum + u.totalInvested, 0)
                .toLocaleString()}
            </h3>
            <p className="text-gray-400 text-xs sm:text-sm">Total Invested</p>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800 rounded-xl p-4 sm:p-6">
          {/* Mobile Filter Toggle */}
          <div className="flex justify-between items-center mb-4 sm:hidden">
            <div className="relative flex-1 mr-3">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              {showFilters && <ChevronDown className="w-4 h-4 rotate-180" />}
              {!showFilters && <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {/* Desktop Filters */}
          <div className="hidden sm:grid grid-cols-1 md:grid-cols-4 gap-4">
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

          {/* Mobile Filters (Collapsible) */}
          {showFilters && (
            <div className="sm:hidden space-y-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={tierFilter}
                onChange={(e) => setTierFilter(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tiers</option>
                <option value="VIP">VIP</option>
                <option value="Premium">Premium</option>
                <option value="Basic">Basic</option>
              </select>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400 text-sm">
                    {filteredUsers.length} of {users.length} users
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Users Display - Always show cards on mobile, toggle on desktop */}
        {viewMode === "card" || isMobile ? (
          /* Card View */

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {paginatedUsers.map((user, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-4 sm:p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-gray-600"
              >
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0 shadow-lg">
                      {index + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-bold text-white truncate">
                        {user.memberid}
                      </h3>
                      <p className="text-gray-400 text-sm truncate flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {user.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between ">
                    <span
                      style={{ fontSize: 10 }}
                      className={`px-3 py-1 rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowActionMenu(
                          showActionMenu === user.memberid
                            ? null
                            : user.memberid
                        )
                      }
                      className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {showActionMenu === user.memberid && (
                      <div className="hidden sm:block absolute right-0 top-10 bg-gray-700 rounded-lg shadow-xl py-2 z-10 min-w-[160px] border border-gray-600">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                            setShowActionMenu(null);
                          }}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-3 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => {
                            handleUserAction("activate", user.id);
                          }}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-3 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Activate
                        </button>
                        <button
                          onClick={() => {
                            handleUserAction("suspend", user.id);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-3 transition-colors"
                        >
                          <Ban className="w-4 h-4" />
                          Suspend
                        </button>
                        <button
                          onClick={() => {
                            handleUserAction("promote", user.id);
                          }}
                          className="w-full text-left cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-600 flex items-center gap-3 transition-colors"
                        >
                          <Star className="w-4 h-4" />
                          Promote Tier
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Intro Section - Redesigned */}
                <div className="mb-4">
                  <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-4 border border-indigo-700/30 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Users className="w-3 h-3 text-white" />
                      </div>
                      <h4 className="text-indigo-300 font-semibold text-sm">
                        Referral Information
                      </h4>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <div>
                          <p className="text-indigo-200 text-xs opacity-80">
                            Intro ID
                          </p>
                          <p className="text-white font-semibold text-sm">
                            {user.introid}
                          </p>
                        </div>
                        <div>
                          <p className="text-indigo-200 text-xs opacity-80">
                            Intro Name
                          </p>
                          <p className="text-white font-medium text-sm truncate">
                            {user.introName}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-center items-center bg-purple-800/30 rounded-lg p-2">
                        <p className="text-purple-200 text-xs">Referrals</p>
                        <p className="text-purple-100 font-bold text-lg">
                          {user.introidTotDirect}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* User Details Section */}
                <div className="space-y-1 mb-1">
                  <div className="flex justify-between items-center ">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      Mobile No
                    </span>
                    <span className="text-white font-medium text-sm">
                      {user.mobileno}
                    </span>
                  </div>

                  <div className="flex justify-between items-center ">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <DollarSign className="w-3 h-3" />
                      Total Invested
                    </span>
                    <span className="text-white font-medium text-sm">
                      ${user.totalInvested.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center ">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Wallet className="w-3 h-3" />
                      Current Balance
                    </span>
                    <span className="text-green-400 font-semibold text-sm">
                      ${user.currentBalance.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center ">
                    <span className="text-gray-400 text-sm flex items-center gap-2">
                      <Users className="w-3 h-3" />
                      Direct Referrals
                    </span>
                    <span className="text-blue-400 font-medium text-sm">
                      {user.totDirect}
                    </span>
                  </div>
                </div>

                {/* Mobile Action Buttons */}
                <div className="flex gap-2 sm:hidden">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-xs font-medium"
                  >
                    <Eye className="w-3 h-3" />
                    View
                  </button>
                  <button
                    onClick={() => setShowActionMenu(user.id)}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-xs"
                  >
                    <MoreVertical className="w-3 h-3" />
                    More
                  </button>
                </div>

                {/* Desktop Action Buttons */}
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setShowUserModal(true);
                    }}
                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors text-sm font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button className="flex cursor-pointer items-center justify-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors text-sm">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="flex cursor-pointer items-center justify-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors text-sm">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      User
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Direct
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Intro
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Contact
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Status
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Invested
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Balance
                    </th>

                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Join Date
                    </th>
                    <th className="text-left p-3 lg:p-4 text-gray-300 font-semibold text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user, index) => (
                    <tr
                      key={index}
                      className={`border-t border-gray-700 hover:bg-gray-700/50 transition-colors ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                      }`}
                    >
                      {/* User Column */}
                      <td className="p-3 lg:p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 lg:w-10 h-8 lg:h-10   bg-blue-500/60 rounded-full flex items-center justify-center text-white font-bold text-xs lg:text-sm shrink-0">
                            {user.avatar}
                          </div>
                          <div className="min-w-0">
                            <p className="text-white font-medium text-sm truncate">
                              {user.memberid}
                            </p>
                            <p className="text-gray-400 text-xs">{user.name}</p>
                          </div>
                        </div>
                      </td>
                      {/* Referrals Column */}
                      <td className="p-3 lg:p-4">
                        <span className="text-blue-400 font-medium text-sm">
                          {user.totDirect}
                        </span>
                      </td>

                      {/* User Column */}
                      <td className="p-3 lg:p-4">
                        <div className="min-w-0 relative">
                          <p className="text-white font-medium text-sm truncate">
                            {user.introid}
                            <span className="absolute top-0 -right-3 border border-gray-700 py-0.5 px-2 text-[12px] rounded-md text-gray-400 ">
                              {user.introidTotDirect}
                            </span>
                          </p>
                          <p className="text-gray-400 text-xs">
                            {user.introName}
                          </p>
                        </div>
                      </td>

                      {/* Contact Column */}
                      <td className="p-3 lg:p-4">
                        <div className="min-w-0">
                          <p className="text-gray-300 text-sm truncate">
                            {user.email}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {user.mobileno}
                          </p>
                        </div>
                      </td>

                      {/* Status Column */}
                      <td className="p-3 lg:p-4">
                        <span
                          className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {user.status.toUpperCase()}
                        </span>
                      </td>

                      {/* Invested Column */}
                      <td className="p-3 lg:p-4">
                        <span className="text-white font-medium text-sm">
                          ${user.totalInvested.toLocaleString()}
                        </span>
                      </td>

                      {/* Balance Column */}
                      <td className="p-3 lg:p-4">
                        <span className="text-green-400 font-medium text-sm">
                          ${user.currentBalance}
                        </span>
                      </td>

                      {/* Join Date Column */}
                      <td className="p-3 lg:p-4">
                        <div>
                          <p className="text-gray-300 text-sm">
                            {user.joinDate}
                          </p>
                          <p className="text-gray-400 text-xs">
                            Time: {user.joinTime}
                          </p>
                        </div>
                      </td>

                      {/* Actions Column */}
                      <td className="p-3 lg:p-4">
                        <div className="flex gap-1 lg:gap-2">
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setShowUserModal(true);
                            }}
                            className="cursor-pointer p-1.5 lg:p-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                          </button>
                          <button
                            className=" cursor-pointer p-1.5 lg:p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-colors"
                            title="Edit User"
                          >
                            <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                          </button>
                          <button
                            className="cursor-pointer p-1.5 lg:p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-colors"
                            title="Delete User"
                          >
                            <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-400 text-sm order-2 sm:order-1">
            Showing {startIndex + 1}-
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{" "}
            {filteredUsers.length} users
          </div>
          <div className="flex gap-1 sm:gap-2 order-1 sm:order-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors text-sm"
            >
              <span className="hidden sm:inline">Previous</span>
              <span className="sm:hidden">Prev</span>
            </button>

            {/* Show fewer page numbers on mobile */}
            {totalPages <= 8 ? (
              [...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))
            ) : (
              <>
                {/* Always show first page */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  1
                </button>

                {/* Show left ellipsis */}
                {currentPage > 3 && (
                  <span className="text-gray-400 px-2">...</span>
                )}

                {/* Show current page - 1, current, current + 1 */}
                {[currentPage - 1, currentPage, currentPage + 1].map(
                  (page) =>
                    page > 1 &&
                    page < totalPages && (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600 text-white"
                        }`}
                      >
                        {page}
                      </button>
                    )
                )}

                {/* Show right ellipsis */}
                {currentPage < totalPages - 2 && (
                  <span className="text-gray-400 px-2">...</span>
                )}

                {/* Always show last page */}
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                    currentPage === totalPages
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-white"
                  }`}
                >
                  {totalPages}
                </button>
              </>
            )}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white transition-colors text-sm"
            >
              <span className="hidden sm:inline">Next</span>
              <span className="sm:hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Action Menu */}
      {showActionMenu && (
        <MobileActionMenu
          user={users.find((u) => u.id === showActionMenu)}
          onClose={() => setShowActionMenu(null)}
        />
      )}

      {/* User Modal */}
      {showUserModal && (
        <UserModal
          user={selectedUser}
          onClose={() => {
            setShowUserModal(false);
            setSelectedUser(null);
          }}
          onTurboPack={(packageId) => {
            handleTurboPack(selectedUser.memberid, packageId);
          }}
          onBoosterPack={(packageId) => {
            handleBoosterPack(selectedUser.memberid, packageId);
          }}
        />
      )}

      {/* Click outside to close menus */}
      {showActionMenu && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowActionMenu(null);
            // setShowFilters(false);
          }}
        />
      )}
    </div>
  );
};

export default AdminTable;
