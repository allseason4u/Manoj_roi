"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  Wallet,
  Layers,
  Menu,
  X,
  Bell,
  Search,
  ChevronRight,
  ChevronDown,
  LogOut,
  Circle,
  Users,
  Zap,
} from "lucide-react";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";
import { decryptData } from "@/utils/cryptoUtils";

const SidebarLayoutAdmin = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [dataset, setData] = useState({});
  const [openSubmenu, setOpenSubmenu] = useState(null); // Track open submenu
  const router = useRouter();
  const pathname = usePathname(); // ✅ Detects current active route

  const fetchData = async () => {
    try {
      const auth = Cookies.get("admintoken");
      const res = await fetch(`/api/admin/dashboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: auth,
        },
      });
      if (!res.ok) throw new Error("Network response was not ok");

      const json = await res.json();
      const decrypted = decryptData(json);
      const parsed = JSON.parse(decrypted);
      setData(parsed);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Sidebar Items with Submenus
  // const sidebarItems = [
  //   { name: "Dashboard", icon: Home, link: "/admin/dashboard" },
  //   {
  //     name: "Members",
  //     icon: Wallet,
  //     submenu: [
  //       { name: "Member List", link: "/admin/userlist" },
  //       { name: "Member Edit", link: "/admin/members/edit" },
  //       { name: "Member Income", link: "/admin/members/income" },
  //     ],
  //   },
  //   { name: "Members", icon: Layers, link: "/admin/userlist" },
  //   { name: "Member Income", icon: Layers, link: "/admin/incomelist" },
  //   { name: "Turbo Members", icon: Layers, link: "/admin/turbo2oList" },
  // ];

  const sidebarItems = [
    { name: "Dashboard", icon: Home, link: "/admin/dashboard" },

    { name: "Members", icon: Users, link: "/admin/userlist" },
    { name: "Member Income", icon: Wallet, link: "/admin/incomelist" },
    { name: "Turbo Members", icon: Zap, link: "/admin/turbo2oList" },
  ];

  const handleLogout = () => {
    Cookies.remove("admintoken");
    router.push("/");
  };

  // Helper: check if active
  const isActive = (link) => pathname === link;

  return (
    <div className="bg-gray-50 min-h-screen relative overflow-hidden text-gray-800">
      {/* Copy Alert */}
      {copiedText && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full shadow-xl">
            <div className="flex items-center space-x-2">
              <Circle className="w-2 h-2 fill-current animate-pulse" />
              <span className="text-sm font-medium">{copiedText}</span>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 shadow-md transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Layers className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Jaaneram</h2>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {sidebarItems.map((item) =>
            item.submenu ? (
              <div key={item.name}>
                {/* Parent button */}
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    openSubmenu === item.name
                      ? "bg-blue-50 text-blue-600 border border-blue-200"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-3 h-5 w-5 ${
                        openSubmenu === item.name
                          ? "text-blue-600"
                          : "text-gray-400 group-hover:text-blue-500"
                      }`}
                    />
                    {item.name}
                  </div>
                  {openSubmenu === item.name ? (
                    <ChevronDown className="h-4 w-4 text-blue-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  )}
                </button>

                {/* Submenu items */}
                {openSubmenu === item.name && (
                  <div className="ml-10 mt-1 space-y-1">
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.name}
                        onClick={() => router.push(sub.link)}
                        className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                          isActive(sub.link)
                            ? "bg-blue-100 text-blue-700 font-semibold"
                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                        }`}
                      >
                        • {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.name}
                onClick={() => router.push(item.link)}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                  isActive(item.link)
                    ? "bg-blue-50 text-blue-600 border border-blue-200"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.link)
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-blue-500"
                    }`}
                  />
                  {item.name}
                </div>

                {item.submenu && (
                  <ChevronRight
                    className={`h-4 w-4 ${
                      isActive(item.link) ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                )}
              </button>
            )
          )}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-72 min-h-screen">
        {/* Top Navbar */}
        <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  <Menu className="h-6 w-6" />
                </button>
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="bg-gray-100 border border-gray-300 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 transition-all"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-500 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors">
                  <Bell className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-3 bg-gray-100 rounded-xl px-3 py-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    {dataset?.name?.charAt(0) || "U"}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium">
                      ID: {dataset?.memberid}
                    </p>
                    <p className="text-xs text-gray-500">Respected Member</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 relative z-10">{children}</main>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%) translateX(-50%);
            opacity: 0;
          }
          to {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SidebarLayoutAdmin;
